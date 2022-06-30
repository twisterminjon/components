import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventEmitter from 'events'
import { toast as toastV1 } from 'react-toastify'

import OutgoingCallNoticeV1 from '../../Molecules/OutgoingCallNotice/OutgoingCallNotice'
import IncomingCallNoticeV1 from '../../Molecules/IncomingCallNotice/IncomingCallNotice'
import NoAnswerNoticeV1 from '../../Molecules/NoAnswerNotice/NoAnswerNotice'
import NoAnswerGroupNoticeV1 from '../../Molecules/NoAnswerGroupNotice/NoAnswerGroupNotice'
import YouAreBusyNoticeV1 from '../../Molecules/YouAreBusyNotice/YouAreBusyNotice'
import OfflineCallNoticeV1 from '../../Molecules/OfflineCallNotice/OfflineCallNotice'
import { USER_STATUS_LIST } from '../../../constants'
import { logMe } from '../../../Helpers/logging'
import StorageUtils from '../../../Helpers/StorageUtils'
import { toast, CommonStorageUtils, EventBus, BUS_EVENTS, Socket } from '@shared/helpers'
import { useNetworkConnectionState } from '@shared/hooks'

import { CallNotice } from '@shared/components'
import useUiV2 from '../../../hooks/useUiV2'

import debug from 'debug'
const d = debug('project:CallManager')

export const SOCKET_API_VERSION = 2

export const CMD_TICKLE = 'TICKLE'
const CMD_TICKLE_GROUP = 'TICKLE-GROUP'
const CMD_HANGUP = 'HANGUP'
const CMD_CANCEL_CALL = 'CANCEL-CALL'
const CMD_ANSWER_CALL = 'ANSWER-CALL'
const CMD_IGNORE_CALL = 'IGNORE-CALL'
const CMD_SKIP_GROUP_CALLER = 'SKIP-GROUP-CALLER'
const CMD_NETWORK_REESTABLISHED = 'NETWORK-REESTABLISHED'
const CMD_JOIN_TRANSLATOR = 'JOIN-TRANSLATOR'

export const OUTGOING_SOCKET_EVENTS = [
  CMD_TICKLE,
  CMD_TICKLE_GROUP,
  CMD_HANGUP,
  CMD_CANCEL_CALL,
  CMD_ANSWER_CALL,
  CMD_IGNORE_CALL,
  CMD_SKIP_GROUP_CALLER,
  CMD_NETWORK_REESTABLISHED,
  CMD_JOIN_TRANSLATOR,
]

const EVT_AWAITING_PICKUP = 'AWAITING_PICKUP' // FIXME: "AWAITING_PICKUP" defers in naming convention from the rest of the inbound events
const EVT_INCOMING_CALL = 'INCOMING-CALL'
const EVT_STOP_RINGING = 'STOP-RINGING'
const EVT_CALL_ACCEPTED = 'CALL-ACCEPTED'
const EVT_CALL_CANCELED = 'CALL-CANCELED'
const EVT_CALL_IGNORED = 'CALL-IGNORED'
const EVT_CALL_COMPLETE = 'CALL-COMPLETE'
const EVT_CALL_MISSED = 'CALL-MISSED'
const EVT_CALL_TIMEOUT = 'CALL-TIMEOUT'
const EVT_CALL_GROUP_NEXT = 'CALL-GROUP-NEXT'
const EVT_CALL_GROUP_TIMEOUT = 'CALL-GROUP-TIMEOUT'

export const INCOMING_SOCKET_EVENTS = [
  EVT_AWAITING_PICKUP,
  EVT_INCOMING_CALL,
  EVT_STOP_RINGING,
  EVT_CALL_ACCEPTED,
  EVT_CALL_CANCELED,
  EVT_CALL_IGNORED,
  EVT_CALL_COMPLETE,
  EVT_CALL_MISSED,
  EVT_CALL_TIMEOUT,
  EVT_CALL_GROUP_NEXT,
  EVT_CALL_GROUP_TIMEOUT,
]

const { participantsUpdatedEmitter, EVT_PARTICIPANTS_UPDATED } = (() => ({
  participantsUpdatedEmitter: new EventEmitter(),
  EVT_PARTICIPANTS_UPDATED: 'participantsUpdated',
}))()

export function triggerParticipantsChanged() {
  participantsUpdatedEmitter.emit(EVT_PARTICIPANTS_UPDATED)
}

// This is used during local dev only to show the current state/props
// of the call manager
const RenderCallManager = props => {
  return (
    <React.Fragment>
      <div
        style={{
          zIndex: 500,
          position: 'fixed',
          bottom: 0,
          backgroundColor: 'white',
          overflowY: 'scroll',
          height: '60vh',
          maxWidth: 300,
        }}>
        <h4>Current State</h4>
        <pre>{JSON.stringify(props.currentState, 0, 2)}</pre>
      </div>
      <div
        style={{
          zIndex: 500,
          position: 'fixed',
          bottom: 0,
          right: 0,
          backgroundColor: 'white',
          overflowY: 'scroll',
          height: '60vh',
          maxWidth: 300,
        }}>
        <h4>Current Props</h4>
        <pre>{JSON.stringify(props.currentProps, 0, 2)}</pre>
      </div>
    </React.Fragment>
  )
}

export default React.forwardRef(function CallManager(
  { callingFeatureFunctions, callingFeatureState, ...rest },
  forwardedRef
) {
  // Adapts callingFeatureFunction / state into current CallManager
  const callProps = {
    initiateCall: callingFeatureState.initiateCall,
    initiateGroupCall: callingFeatureState.initiateGroupCall,
    calleeId: callingFeatureState.calleeId,
    calleeName: callingFeatureState.calleeName,
    calleeProfileImage: callingFeatureState.calleeProfileImage,
    room: callingFeatureState.room,
    groupId: callingFeatureState.groupId,
    showNoAnswer: callingFeatureState.showNoAnswer,
    showNoGroupAnswer: callingFeatureState.showNoGroupAnswer,
    calleeRelatedUser: callingFeatureState.calleeRelatedUser,
    patientInCallId: callingFeatureState.patientInCallId,
    patientInCallUserId: callingFeatureState.patientInCallUserId,
    onAwaitingPickup: callingFeatureFunctions.handleAwaitingPickup,
    onCancelCall: callingFeatureFunctions.handleCancelCall,
    onHideRetry: callingFeatureFunctions.handleHideRetry,
    onCallIgnored: callingFeatureFunctions.handleCallIgnored,
    onCallAccepted: callingFeatureFunctions.handleCallAccepted,
    endCall: callingFeatureState.endCall,
    onCallComplete: callingFeatureFunctions.handleCallComplete,
    onCallTimeout: callingFeatureFunctions.handleCallTimeout,
    onGroupCallTimeout: callingFeatureFunctions.handleGroupCallTimeout,
    onCallMissed: callingFeatureFunctions.handleCallMissed,
    onCallRetry: callingFeatureFunctions.handleRetryCall,
    onGroupCallRetry: callingFeatureFunctions.handleRetryGroupCall,
    onStopRinging: callingFeatureFunctions.handleStopRinging,
    onUpdateOutgoingCall: callingFeatureFunctions.handleUpdateOutgoingCall,
    onStopAllCalling: callingFeatureFunctions.handleStopAllCalling,
    onPatientInCall: callingFeatureFunctions.handlePatientInCall,
    onCaregiverInCall: callingFeatureFunctions.handleCaregiverInCall,
    onCallInProgress: callingFeatureFunctions.handleCallInProgress,
    onClearCallInProgress: callingFeatureFunctions.handleClearCallInProgress,
    onGoToDashboard: callingFeatureFunctions.DEPRECATED_callManager_goToDashboard,
    onHandleDroppedCall: callingFeatureFunctions.handleDroppedCall,
  }

  const { isNavigatorOnline: isOnline } = useNetworkConnectionState()
  const uiV2 = useUiV2()

  return <CallManagerView ref={forwardedRef} {...callProps} isOnline={isOnline} uiV2={uiV2} {...rest} />
})

class CallManagerView extends Component {
  static propTypes = {
    /** The current user */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      overallStatus: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    }),
    /** If true will initiate a call and display the Outgoing call message */
    initiateCall: PropTypes.bool,
    /** If true will initiate a call and display the Outgoing call message */
    initiateGroupCall: PropTypes.bool,
    /** The id of the user being called */
    calleeId: PropTypes.string,
    /** The name of the user being called */
    calleeName: PropTypes.string,
    /** The profileImage of the user being called */
    calleeProfileImage: PropTypes.string,
    /** Id of a user whose is related to user being called */
    calleeRelatedUser: PropTypes.string,
    /** The patient id of a patient that may be on the call */
    patientInCallId: PropTypes.string,
    /** The patient's user id of a patient that may be on the call */
    patientInCallUserId: PropTypes.string,
    /** Name of the room currently being used */
    room: PropTypes.string,
    /** The ID of a group being called */
    groupId: PropTypes.string,
    /** If true the 'no answer' screen will be displayed */
    showNoAnswer: PropTypes.bool,
    /** If true the 'no answer group' screen will be displayed */
    showNoGroupAnswer: PropTypes.bool,
    /** If true will notify other users on the call that you hung up */
    endCall: PropTypes.bool,
    /** If true, will reconnect to the existing call */
    reconnectToCall: PropTypes.bool,
    /** Called when the caller cancels the call */
    onCancelCall: PropTypes.func.isRequired,
    /** Hide any retry notice screens */
    onHideRetry: PropTypes.func.isRequired,
    /** Function called when we receive a stop ringing message */
    onStopRinging: PropTypes.func.isRequired,
    /** Called when the callee does not accept the call */
    onCallIgnored: PropTypes.func.isRequired,
    /** Called when the callee accepts the call */
    onCallAccepted: PropTypes.func.isRequired,
    /** Called when the other caller ends the call  */
    onCallComplete: PropTypes.func.isRequired,
    /** Called when an outgoing call times out */
    onCallTimeout: PropTypes.func.isRequired,
    /** Called when an incoming call times out */
    onCallMissed: PropTypes.func.isRequired,
    /** Called when the timed out call is retried */
    onCallRetry: PropTypes.func.isRequired,
    /** Restart a group call */
    onGroupCallRetry: PropTypes.func.isRequired,
    /** Called when the outgoing call screen needs updating */
    onUpdateOutgoingCall: PropTypes.func.isRequired,
    /** Called to stop any outgoing calls */
    onStopAllCalling: PropTypes.func.isRequired,
    /** Called after an event that includes a patient in a call */
    onPatientInCall: PropTypes.func.isRequired,
    /** Called after an event that includes a caregiver in a call */
    onCaregiverInCall: PropTypes.func.isRequired,
    /** Called after a call is starting, including ringing */
    onCallInProgress: PropTypes.func.isRequired,
    /** Called after a call is completed */
    onClearCallInProgress: PropTypes.func.isRequired,
    /** Function to redirect to dashboard according to Data */
    onGoToDashboard: PropTypes.func.isRequired,
    /** Reconnecting to a call that was dropped */
    onHandleDroppedCall: PropTypes.func.isRequired,
  }
  static defaultProps = {
    initiateCall: false,
    initiateGroupCall: false,
    calleeId: '',
    patientInCallId: '',
    patientInCallUserId: '',
    groupId: '',
    showNoAnswer: false,
    showNoGroupAnswer: false,
    endCall: false,
  }

  constructor(props) {
    super(props)

    const {
      roomName: roomNameCached,
      incomingGroupId: cachedIncomingGroupId,
      timeOutTaskId: cachedTimeoutTaskId,
      maxParticipants: cachedMaxParticipants,
    } = CommonStorageUtils.getCallManagerCache()

    this.state = {
      /* There is an incoming call so show a notification */
      callIncoming: false,
      /* The incoming caller name */
      callerName: '',
      /* The profile image for an incoming caller */
      callerProfileImage: '',
      /* The current room name, both socket and Twilio (or Jitsi) */
      room: roomNameCached ? roomNameCached : '',
      /* Used by BE */
      timeOutTaskId: cachedTimeoutTaskId,
      /* The incoming caller's user ID */
      incomingUserId: '',
      /* The incoming group calls ID */
      incomingGroupId: cachedIncomingGroupId,
      /** The sid of the incoming call (sent by the BE) */
      incomingSid: '',
      /* CallInProgress means we are making, receiving, or on a call */
      callInProgress: false,
      /** A screen can be shown when a call was dropped and no one is available */
      showDroppedCall: false,
      /** You tried to make a call while already on another call */
      showYouAreBusy: false,
      /** Name of the user being called */
      calleeName: '',
      /** Profile image of the user being called. */
      calleeProfileImage: '',
      /** We don't know who the person being called is, typically this happens at the start of a group call */
      seekingNextCallee: false,
      /** Maximum amount of the participants allowed in the call */
      maxParticipants: cachedMaxParticipants ? cachedMaxParticipants : 1,
      /** Related patient's display name (i.e. C2C to Caregiver regarding this patient) */
      relatedDisplayName: '',
      /** Related patient's profile image (i.e. C2C to Caregiver regarding this patient) */
      relatedProfileImg: '',
      /** Related patient's user id (i.e. C2C to Caregiver regarding this patient)
       * @type {number}
       */
      related_user: null,
    }

    // ***********************************************************
    // Listen for call notifications
    // ***********************************************************

    // Listen to all related incoming socket events, and extract call credentials, if present
    ;[EVT_INCOMING_CALL, EVT_CALL_ACCEPTED].forEach(incomingEventName => {
      Socket.on(incomingEventName, eventData => {
        const callCredentials = eventData && eventData.call_credentials

        if (callCredentials) {
          window.projectConfig.callCredentials = callCredentials
          EventBus.emit(BUS_EVENTS.CALL_CREDENTIALS_UPDATED, callCredentials)
        }
      })
    })

    // You are being called
    Socket.on(EVT_INCOMING_CALL, data => {
      d(`< INCOMING-CALL, room: ${data.room}, from-id: ${data.from_user} data= %O`, data)

      const incomingState = {
        room: data.room,
        timeOutTaskId: data.timeout_task_id,
        incomingGroupId: data.group,
        incomingSid: data.sid,
        incomingUserId: data.from_user,
        callInProgress: false, // We haven't answered yet so this is still false
        relatedDisplayName: data.related_display_name,
        relatedProfileImg: data.related_img,
      }
      this.setState(incomingState)

      setTimeout(() => {
        this.callIncoming(data)
      }, 20)
    })

    // Someone was calling you but they canceled the call
    Socket.on(EVT_CALL_CANCELED, userName => {
      d(`socket-event: < CALL-CANCELED, user: ${userName}`)

      this.props.onClearCallInProgress()
      this.resetCallState()
    })

    // Your outgoing call was declined
    Socket.on(EVT_CALL_IGNORED, data => {
      d(`socket-event: < CALL-IGNORED, user: ${data.to_display_name}`)

      // only if you are not in a call
      if (!this.state.callInProgress) {
        this.setState({ callInProgress: false, room: '', incomingUserId: '' })
      }
      this.setState({
        calleeName: data.to_display_name,
        calleeProfileImage: data.to_profile_image,
      })
      this.props.onCallIgnored()
    })

    // your outgoing call was answered
    Socket.on(EVT_CALL_ACCEPTED, data => {
      d(`socket-event: < CALL-ACCEPTED, room: ${data.room}, maxParticipants ${data.max_participants}`)
      let roomName = data.room
      let maxParticipants = data.max_participants

      if (data) {
        // Store persistent values which may be needed across page refreshes
        CommonStorageUtils.setCallManagerCache({
          roomName: data.room,
          incomingGroupId: this.state.incomingGroupId,
          timeOutTaskId: this.state.timeOutTaskId,
          maxParticipants: data.max_participants,
        })
      } else {
        roomName = CommonStorageUtils.getCallManagerCache().roomName
        maxParticipants = CommonStorageUtils.getCallManagerCache().maxParticipants
      }

      this.setState({
        callInProgress: true,
        maxParticipants: maxParticipants,
      })
      this.props.onCallAccepted(roomName)
    })

    // A Caller has been added to a call and is ringing
    Socket.on(EVT_AWAITING_PICKUP, data => {
      d(`socket-event: < AWAITING_PICKUP, room: ${data.room}`)
      const newState = {
        room: data.room,
        timeOutTaskId: data.timeout_task_id,
        calleeName: data.awaiting[0]['to_display_name'],
        calleeProfileImage: data.awaiting[0]['to_profile_image'],
        seekingNextCallee: false,
      }

      this.setState(newState)

      // Third party callers (i.e. translator servicing) may, or may not, have
      // "awaiting" concept built in, so the BE might not be sending this
      // property
      if (data.awaiting) {
        this.props.onAwaitingPickup(data.awaiting)
      }
    })

    // The outgoing call was not answered before the timeout
    Socket.on(EVT_CALL_TIMEOUT, data => {
      d(`socket-event: < CALL-TIMEOUT, msg: ${data.msg}`)
      this.setState({
        calleeName: data.to_display_name,
        calleeProfileImage: data.to_profile_image,
        // Don't reset the room if adding a third party to an ongoing call
        // Because room is used when hanging up
        room: this.state.callInProgress ? this.state.room : '',
      })

      this.props.onCallTimeout()
    })

    // A new user was chosen during a group call (current user did not answer)
    Socket.on(EVT_CALL_GROUP_NEXT, data => {
      const timeOutTaskId = data.timeout_task_id ? data.timeout_task_id : ''
      d(
        `socket-event: < CALL-GROUP-NEXT, room: ${data.room}, to_user: ${data.to_user}, to_display_name: ${data.to_display_name}, timeout_task_id: ${timeOutTaskId}, sid: ${data.sid}`
      )
      const newState = {
        timeOutTaskId,
        incomingUserId: data.to_user,
        incomingSid: data.sid,
        room: data.room,
        calleeName: data.to_display_name,
        calleeProfileImage: data.to_profile_image,
        seekingNextCallee: false,
      }

      this.setState(newState)
      this.props.onUpdateOutgoingCall(data)
    })

    // No one answered a group call (everyone being called declined or timed out)
    Socket.on(EVT_CALL_GROUP_TIMEOUT, data => {
      d(`socket-event: < CALL-GROUP-TIMEOUT, data: ${data}`)

      this.props.onGroupCallTimeout()
    })

    // The incoming call was not answered before the timeout
    Socket.on(EVT_CALL_MISSED, () => {
      d(`socket-event: < CALL-MISSED`)

      this.handleMissedCall()
      this.props.onCallMissed()
      this.resetCallState()
    })

    // Your incoming call was answered by you on another device
    Socket.on(EVT_STOP_RINGING, () => {
      d(`socket-event: < STOP-RINGING`)

      this.resetCallState()
      this.props.onStopRinging()
    })

    // The call you were on has been completed (the other called hung up)
    // This is received after sending the CMD_ANSWER_CALL event. If you go offline and come back, send CMD_ANSWER_CALL to rejoin the call.
    // If the call is now over (other users in room disconnected), then you will receive this event
    Socket.on(EVT_CALL_COMPLETE, data => {
      d(`socket-event: < CALL-COMPLETE, data: ${data.status}`)
      CommonStorageUtils.clearCallManagerCache()

      // Tell the video container to close the call
      this.resetCallState()
      this.props.onCallComplete()
    })

    this.cancelCall = this.cancelCall.bind(this)
    this.handleIgnoreCall = this.handleIgnoreCall.bind(this)
    this.handleAcceptCall = this.handleAcceptCall.bind(this)
    this.handleNotificationClose = this.handleNotificationClose.bind(this)
    this.handleMissedCall = this.handleMissedCall.bind(this)
    this.skipCall = this.skipCall.bind(this)
    this.handleYouAreBusy = this.handleYouAreBusy.bind(this)
    this.handleHideYouAreBusy = this.handleHideYouAreBusy.bind(this)
    this.handleHideRetry = this.handleHideRetry.bind(this)
    this.handleOffline = this.handleOffline.bind(this)
    this.handleOnline = this.handleOnline.bind(this)
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
  }

  componentDidMount() {
    if (this.props.initiateCall) {
      this.tickle()
    }

    window.addEventListener('beforeunload', this.handleBeforeUnload)
  }

  componentDidUpdate(prevProps) {
    // You are starting a call
    if (this.props.initiateCall && this.props.initiateCall !== prevProps.initiateCall) {
      this.tickle()
    }

    if (this.props.isOnline !== prevProps.isOnline) {
      if (!this.props.isOnline) {
        this.handleOffline()
      } else {
        this.handleOnline()
      }
    }

    // You are starting a group call
    if (this.props.initiateGroupCall && this.props.initiateGroupCall !== prevProps.initiateGroupCall) {
      // *******************************************************************************************
      // the following section was added as an attempt to not allow simultaneous calls from
      // different devices. We just checked the status and if not available, show a busy screen.
      // it had a lot of edge cases that caused it show false positives so it is being removed.
      // I'm leaving all the code in place as we will return and do a different way.
      //
      // See ticket ST-2814 for a discussion on why it doesn't work
      // See ticket ST-2818 for this change
      //
      // check that the user is not on a call somewhere else
      // no need to check for room as group calls can't be used to add a caller
      //
      // if (this.props.user.overallStatus !== USER_STATUS_AVAILABLE) {
      //   d('bailing out as the user status is in a busy state')
      //   this.handleYouAreBusy()
      //   this.props.onStopAllCalling()
      //
      //   // We just want to bail out here as onStopCalling is going to reset our props
      //   // and we just want to show the busy screen.
      //   return
      // }
      //
      // *******************************************************************************************
      this.resetCallState()

      const userData = {
        group: this.props.groupId,
        version: SOCKET_API_VERSION,
      }
      this.sendSocketMessage(CMD_TICKLE_GROUP, userData)

      d(`socket-event: TICKLE-GROUP >, group: ${userData.group}, room: ${userData.room}`)

      // reset the callerProfileImage to empty so we know later when a new callee is chosen.
      this.setState({
        callerProfileImage: '',
        incomingUserId: '',
        seekingNextCallee: true,
      })
    }

    // You are ending the current call (hanging up)
    if (this.props.endCall !== prevProps.endCall && this.props.endCall && !this.state.showDroppedCall) {
      this.hangup()
    }
  }

  componentWillUnmount() {
    d('CWU fired')

    if (this.connectionOutTimer) clearTimeout(this.connectionOutTimer)
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

  // Initiate the call
  tickle() {
    // *******************************************************************************************
    // the following section was added as an attempt to not allow simultaneous calls from
    // different devices. We just checked the status and if not available, show a busy screen.
    // it had a lot of edge cases that caused it show false positives so it is being removed.
    // I'm leaving all the code in place as we will return and do a different way.
    //
    // See ticket ST-2814 for a discussion on why it doesn't work
    // See ticket ST-2818 for this change
    //
    // check that the user is not on a call somewhere else (like another device)
    // but allow if they are already on a call, (they are adding a caller to an existing call)
    // if (this.props.user.overallStatus !== USER_STATUS_AVAILABLE && !this.state.room) {
    //   this.handleYouAreBusy()
    //   this.props.onStopAllCalling()
    //   d('bailing out as the user status is in a busy state')
    //   // We just want to bail out here as onStopCalling is going to reset our props
    //   // and we just want to show the busy screen.
    //   return
    // }
    // *******************************************************************************************

    let userData = {
      to_user: this.props.calleeId,
      version: SOCKET_API_VERSION,
    }

    if (this.props.calleeRelatedUser !== '') {
      userData.related_user = this.props.calleeRelatedUser
    }

    // if a patient is in the call, send their user id along
    if (this.props.patientInCallId) {
      userData.patient_id = this.props.patientInCallId
    }

    // If we have a room in state or props, we are adding a caller to an existing call
    if (this.state.room !== '') userData.room = this.state.room
    if (this.state.room === '' && this.props.room) userData.room = this.props.room

    // Reference for the data that is sent along with the tickle event based on called users type
    // When to a staff member
    //   {to_user: "3", version: 2}
    // When to a patient (patient_id is used by the BE to know a patient is in the call)
    //   {to_user: "21", version: 2, patient_id: "5"}
    // When to a caregiver (related_user is the patient related to the caregiver being called)
    //   {to_user: "27", version: 2, related_user: "21"}
    this.sendSocketMessage(CMD_TICKLE, userData)

    // Store persistent values which may be needed across page refreshes
    CommonStorageUtils.setCallManagerCache({
      roomName: this.state.room,
      incomingGroupId: this.state.incomingGroupId,
      timeOutTaskId: this.state.timeOutTaskId,
      maxParticipants: this.state.maxParticipants,
    })

    d(
      `TICKLE >, user-id=${userData.to_user}, room=${userData.room} relatedUser=${userData.related_user}, data= %O`,
      userData
    )

    // reset the callerProfileImage to empty so we know it's a p2p call for the profileImage
    this.setState({ callerProfileImage: '', incomingUserId: '' })
  }

  resetCallState = () => {
    // reset our call state back to the initial state
    // this should be called anytime the user has 100% completed a call (including the retry closed)
    this.setState({
      callIncoming: false,
      callerName: '',
      callerProfileImage: '',
      calleeName: '',
      calleeProfileImage: '',
      room: '',
      timeOutTaskId: '',
      incomingUserId: '',
      incomingGroupId: '',
      incomingSid: '',
      callInProgress: false,
      showDroppedCall: false,
      showYouAreBusy: false,
      seekingNextCallee: false,
      relatedDisplayName: '',
      relatedProfileImg: '',
      related_user: null,
    })

    d(`state reset`)
  }

  // You are receiving an incoming call
  callIncoming(data) {
    const newState = {
      callIncoming: true,
      callerName: data.from_display_name,
      callInProgress: true,
      callerProfileImage: data.from_profile_image,
    }

    // hide any retry screens if they are showing
    if (this.props.showNoAnswer || this.props.showNoGroupAnswer) this.props.onHideRetry()

    // only show the incoming call screen if we didn't initiate the call
    d(`call incoming with data= %O`, data)
    if (!this.props.initiateCall) {
      this.setState(newState)
    }

    if (data.related_user) {
      this.props.onCaregiverInCall({
        relatedId: data.related_user,
      })

      this.props.onCallInProgress()
    }

    if (data.patient_id) {
      d(`call incoming from patient-id=${data.patient_id}`)

      this.props.onPatientInCall({
        patientUserId: data.patient_user_id,
        patientId: data.patient_id,
      })
    }
    this.props.onCallInProgress()
  }

  // You are canceling the current call
  cancelCall() {
    d(
      `socket-event: CANCEL-CALL >, from_user: ${this.props.user.id}, to_user: ${this.state.incomingUserId ||
        this.props.calleeId}, room: ${this.state.room}, group: ${this.props.groupId}, sid: ${
        this.state.incomingSid
      }, timeout_task_id: ${this.state.timeOutTaskId}`
    )

    this.sendSocketMessage(CMD_CANCEL_CALL, {
      from_user: this.props.user.id,
      // The following state is set by the incoming socket call for group calls, or the props for p2p calls.
      to_user: this.state.incomingUserId || this.props.calleeId,
      timeout_task_id: this.state.timeOutTaskId,
      group: this.props.groupId,
      sid: this.state.incomingSid,
      room: this.state.room,
    })

    // Do not reset state if we are adding a user to an in-progress (multi-party) call
    if (!this.state.callInProgress) {
      this.resetCallState()
    }
    this.props.onCancelCall()
  }

  // You wish to skip the current user in a group call
  skipCall() {
    d(
      `socket-event: SKIP-GROUP-CALLER >, from_user: ${this.props.user.id}, to_user: ${this.state.incomingUserId}, room: ${this.state.room}, group: ${this.props.groupId}, sid: ${this.state.incomingSid}, timeout_task_id: ${this.state.timeOutTaskId}`
    )

    this.sendSocketMessage(CMD_SKIP_GROUP_CALLER, {
      from_user: this.props.user.id,

      // The following state is set by the incoming (or awaiting-pickup) socket call
      to_user: this.state.incomingUserId,
      timeout_task_id: this.state.timeOutTaskId,
      group: this.props.groupId,
      sid: this.state.incomingSid,
      room: this.state.room,
      version: SOCKET_API_VERSION,
    })
  }

  hangup() {
    if (this.state.callInProgress) {
      const { roomName: cachedRoomName } = JSON.parse(CommonStorageUtils.getTwilioToken())

      const roomName = this.state.room || this.props.room || cachedRoomName

      if (roomName) {
        const roomData = { room: roomName }
        this.sendSocketMessage(CMD_HANGUP, roomData)

        d(`socket-event: HANGUP >, room: ${roomData.room}`)
      }

      this.resetCallState()
    }
  }

  async addInterpreterToCall(projectLanguageId) {
    d(
      `socket-event: JOIN-TRANSLATOR >, language: ${projectLanguageId}, room: ${this.state.room}, version: ${SOCKET_API_VERSION}`
    )

    this.props.onAwaitingPickup()

    Socket.emit(CMD_JOIN_TRANSLATOR, {
      language: projectLanguageId,
      room: this.state.room,
      version: SOCKET_API_VERSION,
    })

    await new Promise(resolve => {
      participantsUpdatedEmitter.once(EVT_PARTICIPANTS_UPDATED, resolve)
    })

    this.props.onCallAccepted(this.state.room)
  }

  // You are declining an incoming call
  handleIgnoreCall() {
    d(
      `socket-event: IGNORE-CALL >, from_user: ${this.props.user.id}, room: ${this.state.room}, group: ${this.props.groupId}, sid: ${this.state.incomingSid}, timeout_task_id: ${this.state.timeOutTaskId}`
    )

    this.sendSocketMessage(CMD_IGNORE_CALL, {
      from_user: this.state.incomingUserId,

      // The following state is set by the incoming socket call
      room: this.state.room,
      timeout_task_id: this.state.timeOutTaskId,
      group: this.state.incomingGroupId,
      sid: this.state.incomingSid,
      version: SOCKET_API_VERSION,
    })

    this.props.onClearCallInProgress()
    this.resetCallState()
  }

  handleHideRetry() {
    d(`handleHideRetry`)

    this.resetCallState()
    this.props.onHideRetry()
  }

  // You are answering an incoming call.
  handleAcceptCall() {
    let data = {
      room: this.state.room,
      group: this.state.incomingGroupId,
      timeout_task_id: this.state.timeOutTaskId,
    }

    if (data.room) {
      // Store persistent values which may be needed across page refreshes
      CommonStorageUtils.setCallManagerCache({
        roomName: data.room,
        incomingGroupId: data.incomingGroupId,
        timeOutTaskId: data.timeOutTaskId,
      })
    } else {
      const storedCache = CommonStorageUtils.getCallManagerCache()
      data = {
        room: storedCache.room,
        group: storedCache.incomingGroupId,
        timeout_task_id: storedCache.timeOutTaskId,
      }
    }

    d(`socket-event: ANSWER-CALL >, room: ${data.room}, group: ${data.group}, timeout_task_id: ${data.timeout_task_id}`)

    this.sendSocketMessage(CMD_ANSWER_CALL, data)
    this.setState({
      callIncoming: false,
      callInProgress: true,
      incomingUserId: '',
    })
    this.props.onCallAccepted(this.state.room)
  }

  // You're call was interrupted (network out), so reconnect
  handleReconnectToCall(callInProgress) {
    if (callInProgress) {
      const data = {
        room: this.state.room,
        timeout_task_id: this.state.timeOutTaskId,
      }

      d(
        `socket-event: ANSWER-CALL >, handleReconnectToCall - room: ${data.room}, timeout_task_id: ${data.timeout_task_id}`
      )

      this.sendSocketMessage(CMD_ANSWER_CALL, data)
      this.setState({ callInProgress: true })
    }

    if (!callInProgress) {
      d(`handleReconnectToCall - but no call in progress - calling onCallComplete`)
      this.props.onHandleDroppedCall()
      this.setState({ callInProgress: false, showDroppedCall: true })
      this.props.onCallComplete()
    }
  }

  handleHideDroppedCall = () => {
    d(`handleHideDroppedCall - hiding dropped call screen`)
    this.resetCallState()
  }

  // You have missed an incoming call
  handleMissedCall() {
    d(`handleMissedCall`)

    this.resetCallState()
  }

  // FIXME: the following looks like dead code. Should be removed in it's own pr in case it causes some side effect.
  handleNotificationClose() {
    const newState = {
      showNotification: false,
      notificationTitle: '',
      notificationMessage: '',
    }
    this.setState(newState)
  }

  handleYouAreBusy() {
    this.setState({ showYouAreBusy: true })
  }

  handleHideYouAreBusy() {
    d(`hiding you are busy notice`)

    this.resetCallState()
  }

  handleOffline() {
    d(`handleOffline`)
    this.setState({ callIncoming: false })
  }

  handleOnline() {
    d(`handleOnline`)
    if (this.state.room) {
      // we were in a call when the socket disconnected, so try to reconnect to the call

      d(`socket-event: NETWORK-REESTABLISHED >, room: ${this.state.room}`)
      // don't use wrapper as it doesn't handle callbacks.
      Socket.emit(CMD_NETWORK_REESTABLISHED, { room: this.state.room }, incomingData => {
        this.handleReconnectToCall(incomingData)
      })
    }
  }

  handleInitiateClick2Call(user) {
    initiateClick2Call(user, this.props.user)
  }

  sendSocketMessage(message, data) {
    Socket.emit(message, data)
  }

  handleBeforeUnload() {
    this.hangup()
  }

  // This is just for debugging purposes and is only used temporarily when we need it locally
  logInterestingProps = () => {
    logMe('current props', 'bright')
    d('initiateCall: ', this.props.initiateCall)
    d('initiateGroupCall: ', this.props.initiateCall)
    d('calleeId: ', this.props.calleeId)
    d('endCall: ', this.props.endCall)
    d('groupId: ', this.props.groupId)
    d('reconnectToCall: ', this.props.reconnectToCall)
    d('room: ', this.props.room)
    d('showNoAnswer: ', this.props.showNoAnswer)
    d('showNoGroupAnswer: ', this.props.showNoGroupAnswer)
  }

  render() {
    const {
      callIncoming,
      callerName,
      callerProfileImage,
      showDroppedCall,
      showYouAreBusy,
      calleeName: calleeNameFromSocket,
      calleeProfileImage: calleeProfileImageFromSocket,
      seekingNextCallee,
      relatedDisplayName,
      relatedProfileImg,
      callInProgress,
    } = this.state

    const {
      initiateCall,
      initiateGroupCall,
      showNoAnswer,
      showNoGroupAnswer,
      onCallRetry,
      onGroupCallRetry,
      calleeName: calleeNameFromProps,
      calleeProfileImage,
      onGoToDashboard,
      uiV2,
    } = this.props

    const calleeName = calleeNameFromProps || calleeNameFromSocket

    // for local dev only
    let showDebugInfo = null
    if (process.env.NODE_ENV !== 'production') {
      showDebugInfo = StorageUtils.getDebugFlag()
    }

    return (
      <React.Fragment>
        {/* ******************* */}
        {/* NOTIFICATION ****** */}
        {/* ******************* */}

        {uiV2 ? (
          <CallNotice.Outgoing
            show={(initiateCall || initiateGroupCall) && !showNoAnswer && !showYouAreBusy && !callInProgress}
            callingName={calleeName || calleeNameFromSocket || ''}
            profileImage={calleeProfileImage || calleeProfileImageFromSocket}
            seekingNewCallee={seekingNextCallee}
            onCancel={this.cancelCall}
            onSkip={this.skipCall}
            showSkipCall={initiateGroupCall}
          />
        ) : (
          <OutgoingCallNoticeV1
            show={(initiateCall || initiateGroupCall) && !showNoAnswer && !showYouAreBusy && !callInProgress}
            callingName={calleeName || calleeNameFromSocket || ''}
            profileImage={calleeProfileImage || calleeProfileImageFromSocket}
            seekingNewCallee={seekingNextCallee}
            onCancel={this.cancelCall}
            onSkip={this.skipCall}
            showSkipCall={initiateGroupCall}
          />
        )}

        {uiV2 ? (
          <CallNotice.Incoming
            show={callIncoming}
            displayName={callerName}
            profileImage={callerProfileImage}
            relatedName={relatedDisplayName}
            relatedProfileImage={relatedProfileImg}
            onIgnore={this.handleIgnoreCall}
            onAnswer={this.handleAcceptCall}
          />
        ) : (
          <IncomingCallNoticeV1
            show={callIncoming}
            callerName={callerName}
            profileImage={callerProfileImage}
            relatedCallerName={relatedDisplayName}
            relatedProfileImage={relatedProfileImg}
            onIgnore={this.handleIgnoreCall}
            onAnswer={this.handleAcceptCall}
          />
        )}

        {uiV2 ? (
          <CallNotice.NoAnswer
            show={showNoAnswer}
            displayName={calleeName || ''}
            profileImage={calleeProfileImage}
            onCancel={this.handleHideRetry}
            onRetry={onCallRetry}
          />
        ) : (
          <NoAnswerNoticeV1
            show={showNoAnswer}
            callingName={calleeName || ''}
            profileImage={calleeProfileImage}
            onCancel={this.handleHideRetry}
            onRetry={onCallRetry}
          />
        )}

        {uiV2 ? (
          <CallNotice.NoAnswerGroup
            show={showNoGroupAnswer}
            onCancel={this.handleHideRetry}
            onRetry={onGroupCallRetry}
          />
        ) : (
          <NoAnswerGroupNoticeV1 show={showNoGroupAnswer} onCancel={this.handleHideRetry} onRetry={onGroupCallRetry} />
        )}

        {uiV2 ? (
          <CallNotice.Offline
            show={showDroppedCall}
            onGoToDashboard={onGoToDashboard}
            onCancel={this.handleHideDroppedCall}
          />
        ) : (
          <OfflineCallNoticeV1
            show={showDroppedCall}
            onGoToDashboard={onGoToDashboard}
            onCancel={this.handleHideDroppedCall}
          />
        )}

        {uiV2 ? (
          <CallNotice.YouAreBusy show={showYouAreBusy} onCancel={this.handleHideYouAreBusy} />
        ) : (
          <YouAreBusyNoticeV1 show={showYouAreBusy} onCancel={this.handleHideYouAreBusy} />
        )}

        {/* This is used during local dev only to show the current state/props of the call manager */}
        {showDebugInfo && <RenderCallManager currentState={this.state} currentProps={this.props} />}
      </React.Fragment>
    )
  }
}

/**
 * Start a click2call call with an offline user.
 * This will initiate the call and display a toast to the calling user with instructions
 *
 * @param {Object} callData - The data for the call, this can be different depending on who is being called
 * @param {string} callData.userId - The id of the user being called, required
 * @param {string} callData.displayName - The displayName of the user being called, required
 * @param {string} [callData.patientId] - If the call is to a patient, the user's patient id
 * @param {string} [callData.relatedId] - If the call is to a caregiver, the patient id the call is in reference to
 *
 * @return {void}
 */
// FIXME: This  call data sent here should match the call data for onDial. See ST-6652 for a fix to onDial and initiateClick2Call
// onDial expects { id: '1' } and this expects { userId: '1'}
// I think a better solution would be to include the user's status in callData and have a single onDial that can determine if the toast is shown.
export const initiateClick2Call = (callData, currentUser) => {
  const eventData = {
    to_user: callData.userId,
  }

  if ('patientId' in callData) eventData.patient_id = callData.patientId
  if ('relatedId' in callData) eventData.related_user = callData.relatedId

  eventData.version = SOCKET_API_VERSION

  Socket.emit(CMD_TICKLE, eventData)

  showClick2CallToast(callData.displayName, currentUser)
}

/**
 * Display a notification to the user that the call was a click2call
 *
 * @param {string} displayName - The displayName of the user being called
 *
 * @return {void}
 */
const showClick2CallToast = (displayName, currentUser) => {
  if (currentUser && currentUser.enterprise && currentUser.enterprise.uiV2) {
    toast.info(`${displayName} is offline. We sent a message and you will be notified when the call is accepted.`, {
      toastId: `C2C_TOAST_ID_${displayName}`,
    })
    return
  }

  toastV1.info(`${displayName} is offline. We sent a message and you will be notified when the call is accepted.`, {
    toastId: `C2C_TOAST_ID_${displayName}`,
  })
}
