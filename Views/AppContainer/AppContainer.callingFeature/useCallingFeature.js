import { useCallback, useEffect, useRef } from 'react'

import { useObjectState, useTwilioConnector } from '@shared/hooks'
import { CommonStorageUtils, addAwaitingTimer, featureAudioOnlyCalls } from '@shared/helpers'

import StorageUtils from '../../../../Helpers/StorageUtils'

import debug from 'debug'

const { LocalUIParticipant } = useTwilioConnector

// Create debug namespace
const d = debug('project:AppContainer.useCallingFeature')

// Used for refresh detection while on call
const APP_INITIAL_WINDOW_LOCATION = window.location.href

// FIXME: We use a callInProgress flag to know there is a call in progress, it is handled both here 'and' in CallManager, It should be moved to be handled here only.

export default function useCallingFeature({ callManager, user, history, location }) {
  const [state, setState] = useObjectState(
    (() => {
      const {
        calleeId,
        calleeName,
        patientInCallId,
        patientInCallUserId,
      } = StorageUtils.getCallManagerAppContainerCache()

      const defaultState = {
        groupId: '',
        calleeId,
        calleeName,
        calleeProfileImage: '',
        awaitingTimers: [],
        initiateCall: false,
        initiateGroupCall: false,
        showNoAnswer: false,
        showNoGroupAnswer: false,
        awaitingPickup: [],
        room: '',
        endCall: false,
        calleeRelatedUser: '',

        callInProgress: false, // True when a call is ringing or in progress

        droppedCall: false, // Used to determine if the call was hang after reconnecting
        isMediaDevicePresentForCalling: false,

        // ***************** Provider Only ************

        hasAudioOnlyFeature: undefined,

        callComplete: false,
        showCallOptions: false,
        calleeUser: {},

        patientInCallId,
        patientInCallUserId, // The server has connected and given us metadata
        initiateAudioCall: false,
      }

      return defaultState
    })()
  )
  // Perform a new detection for feature audio-only calls on each render, and
  // if it's not the same, update the state
  const hasAudioOnlyFeature = featureAudioOnlyCalls(user)

  useEffect(() => {
    setState({
      hasAudioOnlyFeature,
    })
  }, [hasAudioOnlyFeature, setState])

  const refBeforeCallWindowLocation = useRef(null)

  /**
   * Sets memoized location, and doesn't re-render before doing so.
   *
   * @return void
   */
  const setBeforeCallWindowLocation = useCallback(() => {
    if (location.pathname.startsWith('/app/call/')) {
      return
    }

    refBeforeCallWindowLocation.current = location.pathname
  }, [location.pathname])

  /**
   * Retrieves memoized location.
   *
   * @return {string}
   */
  const getBeforeCallWindowLocation = useCallback(() => {
    return refBeforeCallWindowLocation.current
  }, [])

  const goToDashboard = useCallback(() => {
    // REMOVE: when v2 is live change all /app/dashboard to /app/home
    // NOTE: This no longer returns to the dashboard.
    // It will attempt to return the user to their previous location.

    // Obtain URL of before-call-was-made state so we can return to it
    const beforeCallWindowLocation = getBeforeCallWindowLocation()

    if (!beforeCallWindowLocation) {
      history.replace('/app/dashboard')
      return
    }

    if (beforeCallWindowLocation.includes('/call/')) {
      history.replace('/app/dashboard')
      return
    }

    if (beforeCallWindowLocation && location.pathname !== beforeCallWindowLocation.pathname) {
      history.replace(beforeCallWindowLocation)
      return
    }

    history.replace('/app/dashboard')
  }, [getBeforeCallWindowLocation, history, location.pathname])

  // Declare our methods so that the compiler doesn't complain about internal
  // variables being called out of order (this was necessary to make it build)
  let setInitialCallState = null
  let handleInitiateCall = null
  let handleInitiateAudioCall = null
  let handleInitiateVideoCall = null
  let handlePatientInitiateCall = null
  let handleInitiateCaregiverCall = null
  let handleCaregiverInCall = null
  let handleInitiateInterpreterCall = null
  let handleInitiateGroupCall = null
  let handleAddCaller = null
  let handleAwaitingPickup = null
  let handleRetryCall = null
  let handleRetryGroupCall = null
  let handleCallAccepted = null
  let handleDroppedCall = null
  let handleCancelCall = null
  let handleHideRetry = null
  let handleCallIgnored = null
  let handleCallTimeout = null
  let handlePatientInCall = null
  let handleStopRinging = null
  let handleGroupCallTimeout = null
  let handleCallMissed = null
  let handleCallComplete = null
  let handleHangup = null
  let handleUpdateOutgoingCall = null
  let handleStopIncomingCall = null
  let handleStopAllCalling = null
  let handleCallStarted = null
  let handleCallInProgress = null
  let handleClearCallInProgress = null
  let clearCallState = null

  // Setup an initial call state, i.e. no calls in progress
  // FIXME: The setInitialCallState needs to be redone. The idea behind it was a central location to get back a state similar to 'just logged in'.
  // That part works fine, but we frequently need to call only part of it, we are off a call but don't want to clear everything (looking at you retryCall).
  // Not sure what the best approach will be but I think issue is state is managing many different things and the setInitialCallState is to broad.
  // We it should be split up into 3 distinct roles:
  // * Initiate and stop calls, i.e. initiateCall and initiateGroupCall should be functions to call similar to stopAllCalls
  // * Handle call data, i.e. this is data about the call (profile image, id, related, etc...)
  // * Handle notices, i.e., split out show/hide incoming, show/hide no answer, etc...
  // * We should also update to have a previousCallType flag in state. i.e. caregiver, patient, staff, interpreter. This should be done when the interpreters are added.
  setInitialCallState = useCallback(() => {
    d(`call state reset`)
    setState({
      initiateCall: false,
      initiateGroupCall: false,
      showNoAnswer: false,
      showNoGroupAnswer: false,
      awaitingPickup: [],
      room: '',
      endCall: false,
      callComplete: false,
      calleeName: '',
      calleeProfileImage: '',
      calleeRelatedUser: '',
      patientInCallId: '',
      patientInCallUserId: '',
      droppedCall: false,
      showCallOptions: false,
      calleeUser: {},
      initiateAudioCall: false,
    })
  }, [setState])

  // Determine if media device is present for calling, and add it to the state
  useEffect(() => {
    LocalUIParticipant.fetchIsMediaDevicePresent().then(isMediaDevicePresentForCalling =>
      setState({
        isMediaDevicePresentForCalling,
      })
    )
  }, [setState])

  // If the enterprise has audio only call feature it shows the call options (Video/Audio)
  // if not it initiates a video call
  handleInitiateCall = useCallback(
    user => {
      setBeforeCallWindowLocation()

      setState({ calleeUser: user })

      if (state.hasAudioOnlyFeature) {
        d(`Showing Call Options`)
        setState({ showCallOptions: true }) // For audio-only/video calls
        return
      }

      handleInitiateVideoCall(user)
    },
    [setBeforeCallWindowLocation, handleInitiateVideoCall, setState, state.hasAudioOnlyFeature]
  )

  const handleInitiateClick2Call = useCallback(
    user => {
      callManager && callManager.handleInitiateClick2Call(user)
    },
    [callManager]
  )

  // -----------------------------------
  // Start Audio Call
  // -----------------------------------
  handleInitiateAudioCall = useCallback(
    user => {
      setBeforeCallWindowLocation()

      setInitialCallState()

      setState({
        initiateAudioCall: true,
        callInProgress: true,
        calleeUser: user,
      })
      d(`initiating Audio call to USER data= %O`, user)
    },
    [setBeforeCallWindowLocation, setInitialCallState, setState]
  )

  // FIXME Refactor all InitiateCall to combine Staff, Patient, Caregiver and Interpreter in a single function
  // using the structure received (user) to highlight the type of user for the call
  // -----------------------------------
  // Start p2p call
  // -----------------------------------
  handleInitiateVideoCall = useCallback(
    user => {
      setBeforeCallWindowLocation()

      setInitialCallState()

      if (user.patientId) handlePatientInCall(user)
      if (user.relatedUser) handleCaregiverInCall(user)

      setState({
        initiateCall: true,
        calleeId: user.id,
        calleeName: user.displayName,
        calleeProfileImage: user.profileImage,
      })

      handleCallInProgress()

      d(`initiating call to USER data= %O`, user)
    },
    [
      setBeforeCallWindowLocation,
      handleCallInProgress,
      handleCaregiverInCall,
      handlePatientInCall,
      setInitialCallState,
      setState,
    ]
  )

  // -----------------------------------
  // Start p2p call with a patient
  // -----------------------------------
  handlePatientInitiateCall = useCallback(
    user => {
      setInitialCallState()
      // This is special in that we need to store the id's of the patient
      // so we can use them later if a caregiver is added to the call
      handlePatientInCall(user)

      // The above adds the following to state
      // * patientInCallId
      // * patientInCallUserId

      setState({
        initiateCall: true,
        calleeId: user.id,
        calleeName: user.displayName,
        calleeProfileImage: user.profileImage,
      })
      handleCallInProgress()
      d(`initiating call to PATIENT data= %O`, user)
    },
    [handleCallInProgress, handlePatientInCall, setInitialCallState, setState]
  )

  // -----------------------------------
  // Call an interpreter
  // -----------------------------------
  handleInitiateCaregiverCall = useCallback(
    user => {
      const relatedId = user.relatedUser
      setState({
        initiateCall: true,
        calleeId: user.id,
        calleeName: user.displayName,
        calleeProfileImage: user.profileImage,
        calleeRelatedUser: relatedId,
      })
      d(`initiating call to CAREGIVER data= %O`, user)
    },
    [setState]
  )

  handleCaregiverInCall = useCallback(
    user => {
      const relatedUserId = user.relatedId.toString()
      setState({
        calleeRelatedUser: relatedUserId,
      })
    },
    [setState]
  )

  handleInitiateInterpreterCall = useCallback(
    projectLanguageId => {
      d(`adding interpreter-language-id="${projectLanguageId}" to call`)

      callManager.addInterpreterToCall(projectLanguageId)
    },
    [callManager]
  )

  // -----------------------------------
  // Start group call
  // -----------------------------------
  handleInitiateGroupCall = useCallback(
    id => {
      setInitialCallState()
      setState({
        initiateGroupCall: true,
        groupId: id,
        // Clear any lingering state from a previous call
        calleeProfileImage: '',
        calleeRelatedUser: '',
      })
      handleCallInProgress()
    },
    [handleCallInProgress, setInitialCallState, setState]
  )

  // -----------------------------------
  // Add a caller to an existing call
  // -----------------------------------
  handleAddCaller = useCallback(
    user => {
      const relatedId = user.relatedUser
      setState({
        initiateCall: true,
        calleeName: user.displayName,
        calleeId: user.id,
        calleeProfileImage: user.profileImage,
        calleeRelatedUser: relatedId,
      })
      d(`adding user to a call user= %O`, user)
    },
    [setState]
  )

  // -----------------------------------
  // A new caller is being added to a call (ringing)
  // -----------------------------------
  handleAwaitingPickup = useCallback(
    awaitingList => {
      // "awaitingList" may be undefined if translator is being added
      if (awaitingList) {
        setState({
          awaitingPickup: awaitingList,
        })
      }
    },
    [setState]
  )

  // -----------------------------------
  // Retry the previous p2p call
  // -----------------------------------
  handleRetryCall = useCallback(() => {
    // we may have initiated the call different ways so check and call the appropriate fn

    // Save some state so we can reuse it to start the next call
    const savedState = {
      calleeId: state.calleeId,
      calleeName: state.calleeName,
      calleeProfileImage: state.calleeProfileImage,
      calleeRelatedUser: state.calleeRelatedUser,
      patientInCallId: state.patientInCallId,
      patientInCallUserId: state.patientInCallUserId,
    }

    // reset so we can start a call from the beginning
    setInitialCallState()

    // determine the original call type and re-initiate
    if (savedState.calleeRelatedUser) {
      // we are retying a call to a caregiver
      handleInitiateCaregiverCall({
        displayName: savedState.calleeName,
        id: savedState.calleeId,
        relatedUser: savedState.calleeRelatedUser,
        profileImage: savedState.calleeProfileImage,
      })

      d(`retrying call to caregiver, user= %O`, {
        displayName: savedState.calleeName,
        id: savedState.calleeId,
        relatedUser: savedState.calleeRelatedUser,
        profileImage: savedState.calleeProfileImage,
      })
      return
    }

    if (savedState.patientInCallId) {
      // we are retrying a patient call
      handlePatientInitiateCall({
        displayName: savedState.calleeName,
        id: savedState.calleeId,
        relatedUser: savedState.calleeRelatedUser,
        profileImage: savedState.calleeProfileImage,
        patientId: savedState.patientInCallId,
        patientUserId: savedState.patientInCallUserId,
      })

      d(`retrying call to caregiver, user= %O`, {
        displayName: savedState.calleeName,
        id: savedState.calleeId,
        relatedUser: savedState.calleeRelatedUser,
        profileImage: savedState.calleeProfileImage,
        patientId: savedState.patientInCallId,
        patientUserId: savedState.patientInCallUserId,
      })
      return
    }

    // we are retrying a staff user call
    handleInitiateVideoCall({
      displayName: savedState.calleeName,
      id: savedState.calleeId,
      relatedUser: savedState.calleeRelatedUser,
      profileImage: savedState.calleeProfileImage,
    })

    d(`retrying call, user= %O`, {
      calleeName: savedState.calleeName,
      calleeId: savedState.calleeId,
      calleeProfileImage: savedState.calleeProfileImage,
      calleeRelatedUser: savedState.calleeRelatedUser,
    })
  }, [
    handleInitiateCaregiverCall,
    handleInitiateVideoCall,
    handlePatientInitiateCall,
    setInitialCallState,
    state.calleeId,
    state.calleeName,
    state.calleeProfileImage,
    state.calleeRelatedUser,
    state.patientInCallId,
    state.patientInCallUserId,
  ])

  // -----------------------------------
  // Retry the previous group call
  // -----------------------------------
  handleRetryGroupCall = useCallback(() => {
    handleInitiateGroupCall(state.groupId)
  }, [handleInitiateGroupCall, state.groupId])

  // -----------------------------------
  // Answer a call
  // -----------------------------------
  handleCallAccepted = useCallback(
    room => {
      // We need to save some state for things like retry declined and no answer forms
      const savedState = {
        calleeProfileImage: state.calleeProfileImage,
        calleeRelatedUser: state.calleeRelatedUser,
        patientInCallId: state.patientInCallId,
        patientInCallUserId: state.patientInCallUserId,
      }

      // FIXME: the before call location doesn't work because CallManager sets callInProgress to true before calling this function.
      // We should be let setting callInProgress here but I don't know how that will affect CallManager.
      setBeforeCallWindowLocation()
      setInitialCallState()

      setState(savedState)

      // We may already be on the call.
      // We will receive a CALL-ACCEPTED after we have answered the call.
      if (!window.location.href.includes('/call/')) {
        // setInitialCallState()
        setState({
          room,
        })
        history.push(`/app/call/${room}`)
      }
    },
    [
      history,
      setBeforeCallWindowLocation,
      setInitialCallState,
      setState,
      state.calleeProfileImage,
      state.calleeRelatedUser,
      state.patientInCallId,
      state.patientInCallUserId,
    ]
  )

  // -----------------------------------
  // You reconnect to a call that was dropped (Other participants hanged up)
  // -----------------------------------
  handleDroppedCall = useCallback(() => {
    setState({
      droppedCall: true,
    })
  }, [setState])

  // -----------------------------------
  // Cancel the current call
  // -----------------------------------
  handleCancelCall = useCallback(() => {
    clearCallState()
    handleClearCallInProgress()
    CommonStorageUtils.clearCallManagerCache()
  }, [clearCallState, handleClearCallInProgress])

  // -----------------------------------
  // Hide the retry/no answer message
  // -----------------------------------
  handleHideRetry = useCallback(() => {
    // We can cleanup any lingering state here
    setState({ room: '', groupId: '' })
    setInitialCallState()
    handleClearCallInProgress()
  }, [handleClearCallInProgress, setInitialCallState, setState])

  // FIXME: handleCallIgnored and handleCallTimeout do the same thing (dupe code), but are required based on socket events
  // This needs to be DRYed out, the code inside should be moved to functions and let each just call them.
  // -----------------------------------
  // Current call was declined
  // -----------------------------------
  handleCallIgnored = useCallback(
    displayName => {
      d(`call ignored ${displayName}`)

      // We show different ignored screens for p2p and 'Add a caller'
      // If we are already on a call, then we are 'Adding' a new caller'
      if (location.pathname.includes('/call/')) {
        // we were adding a caller, update awaitingPickup to show them as declined
        const updatedAwaiting = [...state.awaitingPickup]
        updatedAwaiting.forEach(user => {
          if (user.displayName === displayName) {
            user.state = 'declined'

            addAwaitingTimer(state, setState, user.id)
          }
        })

        setState({
          awaitingPickup: updatedAwaiting,
          initiateCall: false,
        })
      } else {
        // this is a p2p call

        // we need to save the profile image so it is available for the no answer notice
        const { calleeProfileImage, calleeRelatedUser, patientInCallId, patientInCallUserId } = state

        setInitialCallState()
        setState({
          showNoAnswer: true,
          calleeProfileImage,
          calleeRelatedUser,
          patientInCallId,
          patientInCallUserId,
        })
      }
    },
    [location.pathname, setInitialCallState, setState, state]
  )

  // -----------------------------------
  // Current call timed out
  // -----------------------------------
  handleCallTimeout = useCallback(
    displayName => {
      d(`call timed out ${displayName}`)

      // We show different ignored screens for p2p and 'Add a caller'
      // If we are already on a call, then we are 'Adding' a new caller
      if (location.pathname.includes('/call/')) {
        // we were adding a caller, update awaitingPickup to show them as declined

        // go through the awaitingPickup array and find them
        // add a flag for declined call

        const updatedAwaiting = [...state.awaitingPickup]
        updatedAwaiting.forEach(user => {
          if (user.displayName === displayName) {
            user.state = 'declined'

            addAwaitingTimer(state, setState, user.id)
          }
        })

        setState({
          awaitingPickup: updatedAwaiting,
          initiateCall: false,
        })
      } else {
        // this is a p2p call

        // we need to save some items so it is available for the no answer notice
        const { calleeProfileImage, calleeRelatedUser, patientInCallId, patientInCallUserId } = state

        setInitialCallState()
        handleClearCallInProgress()
        setState({
          showNoAnswer: true,
          calleeProfileImage,
          calleeRelatedUser,
          patientInCallId,
          patientInCallUserId,
        })
      }
    },
    [handleClearCallInProgress, location.pathname, setInitialCallState, setState, state]
  )

  // -----------------------------------
  // You have an incoming call and it is a patient,
  // Save the id so we have it for showing associated caregivers when needed
  // -----------------------------------
  handlePatientInCall = useCallback(
    user => {
      // make sure val is a string,
      // we get a string when the API provides the val
      // but we get a number when the socket provides the val
      const coercedId = user.patientId.toString()
      const coercedUserId = user.patientUserId.toString()

      d(`storing incoming call patient data= %O`, {
        patientInCallId: coercedId,
        patientInCallUserId: coercedUserId,
      })
      setState({
        patientInCallId: coercedId,
        patientInCallUserId: coercedUserId,
      })
    },
    [setState]
  )

  // -----------------------------------
  // Current call was answered on a different device
  // -----------------------------------
  handleStopRinging = useCallback(() => {
    setInitialCallState()
    handleClearCallInProgress()
  }, [handleClearCallInProgress, setInitialCallState])

  // -----------------------------------
  // Current Group call timed out
  // -----------------------------------
  handleGroupCallTimeout = useCallback(() => {
    setInitialCallState()
    handleClearCallInProgress()
    setState({
      showNoGroupAnswer: true,
    })
  }, [handleClearCallInProgress, setInitialCallState, setState])

  // -----------------------------------
  // An incoming call was missed (timed out)
  // -----------------------------------
  handleCallMissed = useCallback(() => {
    setInitialCallState()
    handleClearCallInProgress()
    // For future use
  }, [handleClearCallInProgress, setInitialCallState])

  // -----------------------------------
  // The other user hung-up
  // Tell the video container to end the call
  // -----------------------------------
  handleCallComplete = useCallback(() => {
    d(`Call Complete`)
    const droppedCallInstance = state.droppedCall
    setInitialCallState()
    setState({
      callComplete: true,
      patientInCallId: null,
      patientInCallUserId: null,
      droppedCall: droppedCallInstance,
    })
    handleClearCallInProgress()
  }, [handleClearCallInProgress, setInitialCallState, setState, state.droppedCall])

  // -----------------------------------
  // You hung-up your call
  // -----------------------------------
  handleHangup = useCallback(() => {
    // Note: (jh) I originally tried to call this in CallManager but
    // callManager is null here, and I'm not sure why, because
    // it is used in other places just fine
    CommonStorageUtils.clearCallManagerCache()

    setState({
      // tell call manager you hung up
      endCall: true,
      patientInCallId: null,
      patientInCallUserId: null,
      calleeRelatedUser: null,
    })

    handleClearCallInProgress()

    if (!state.droppedCall) {
      goToDashboard()
    }
  }, [goToDashboard, handleClearCallInProgress, setState, state.droppedCall])

  // -----------------------------------
  // A new user is being called as part of a group call
  // this updates the outgoing call screen
  // -----------------------------------
  handleUpdateOutgoingCall = useCallback(
    user => {
      setState({
        calleeName: user.to_display_name,
        calleeId: user.to_id,
        profileImage: user.to_profile_image,
      })
    },
    [setState]
  )

  // -----------------------------------
  // Called when the BE tells the FE to stop ringing
  //
  // This user answered the call on a different device
  // -----------------------------------
  handleStopIncomingCall = useCallback(() => {
    d(`you answered the call on another device`)

    setInitialCallState()
    handleClearCallInProgress()
    goToDashboard()
  }, [goToDashboard, handleClearCallInProgress, setInitialCallState])

  // -----------------------------------
  // Called when the callManager determines a call can't be started
  //
  // This user tried to call while in a call on another device
  // -----------------------------------
  handleStopAllCalling = useCallback(() => {
    d(`you tried to start a call while in a call on another device`)

    handleClearCallInProgress()
    setInitialCallState()
  }, [handleClearCallInProgress, setInitialCallState])

  handleCallStarted = useCallback(() => {
    // Called if user lands directly on call screen (i.e. via refresh)
    if (callManager && window.location.href === APP_INITIAL_WINDOW_LOCATION) {
      callManager.handleAcceptCall()
    }
  }, [callManager])

  handleCallInProgress = useCallback(() => {
    setState({ callInProgress: true })
  }, [setState])

  handleClearCallInProgress = useCallback(() => {
    setState({ callInProgress: false })
  }, [setState])

  clearCallState = useCallback(() => {
    setState({
      calleeName: '',
      calleeProfileImage: '',
      initiateCall: false,
      initiateGroupCall: false,
      showNoAnswer: false,
      showNoGroupAnswer: false,
      awaitingPickup: [],
      room: '',
      endCall: false,
      callComplete: false,
      showCallOptions: false,
      calleeUser: {},
      initiateAudioCall: false,
    })
  }, [setState])

  // FIXME: Remove when possible
  //
  // Called from AppContainer and should be refactored so app container doesn't
  // have to call back this way
  const DEPRECATED_setCallingFeatureState = useCallback(
    callingFeatureState => {
      setState(callingFeatureState)
    },
    [setState]
  )

  // Expose all of the calling feature functions as a single object
  const callingFeatureFunctions = {
    setInitialCallState,
    handleInitiateCall,
    handleInitiateVideoCall,
    handleInitiateClick2Call,
    handleInitiateGroupCall,
    handleInitiateAudioCall,
    handleInitiateCaregiverCall,
    handleInitiateInterpreterCall,
    handlePatientInitiateCall,
    handleCaregiverInCall,
    handleAddCaller,
    handleAwaitingPickup,
    handleRetryCall,
    handleRetryGroupCall,
    handleCallAccepted,
    handleDroppedCall,
    handleCancelCall,
    handleHideRetry,
    handleCallIgnored,
    handleCallTimeout,
    handlePatientInCall,
    handleStopRinging,
    handleGroupCallTimeout,
    handleCallMissed,
    handleCallComplete,
    handleHangup,
    handleUpdateOutgoingCall,
    handleStopIncomingCall,
    handleStopAllCalling,
    handleCallStarted,
    handleCallInProgress,
    handleClearCallInProgress,
    clearCallState,
    //
    // The following properties are just meant to be used here temporarily.
    //
    DEPRECATED_setCallingFeatureState,
    DEPRECATED_callManager_goToDashboard: goToDashboard,
  }

  return {
    callingFeatureState: state,
    callingFeatureFunctions,
  }
}
