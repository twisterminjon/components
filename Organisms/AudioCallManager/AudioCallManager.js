import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Socket, EventBus, BUS_EVENTS } from '@shared/helpers'
import { USER_STATUS_LIST } from '../../../constants'
import OutgoingAudioCallNotice from '../../Molecules/OutgoingAudioCallNotice/OutgoingAudioCallNotice'
import { CallNotice } from '@shared/components'
import { CurrentUserContext } from '@shared/providers'

import debug from 'debug'
const d = debug('project:AudioCallManager')

const EVT_TRIGGER_AUDIO_CALL = 'TRIGGER-AUDIO-CALL'
const EVT_ERROR_AUDIO_CALL = 'AUDIO-CALL-ERROR'
const EVT_AWAITING_PICKUP_AUDIO = 'AUDIO-CALL-AWAITING-PICKUP'
const EVT_COMPLETED_AUDIO_CALL = 'AUDIO-CALL-COMPLETED'
// This event is not necessary for Provider Web, but is left in case the flow
// changes and we need it
// const EVT_STATUS_AUDIO_CALL = 'AUDIO-CALL-STATUS'
// Cancel audio call is being remove, as we don't have control when the
// call is cancelled
// const EVT_CANCEL_AUDIO_CALL = 'CANCEL-AUDIO-CALL'

export default class AudioCallManager extends Component {
  static propTypes = {
    /** User that is being called */
    calleeUser: PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
      overallStatus: PropTypes.oneOf(USER_STATUS_LIST),
      favorite: PropTypes.bool,
      isActive: PropTypes.bool,
      profileImage: PropTypes.string,
    }),
    /** Called when the call errors out or the call is finished */
    onFinishCall: PropTypes.func.isRequired,
    /** If true will initiate a call and display the Outgoing call message */
    initiateCall: PropTypes.bool,
  }
  static defaultProps = {
    calleeUser: { displayName: '-', profileImage: ' ' },
    initiateCall: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      /* The current room name, both socket and Twilio (or Jitsi) */
      room: '',
      /** Error Message received from  EVT_ERROR_AUDIO_CALL event*/
      error: '',
      /** Either if it shows the Error Message component or not */
      showError: false,
    }

    this.handleErrorClose = this.handleErrorClose.bind(this)
    this.bindSocketEvents = this.bindSocketEvents.bind(this)

    // // ***********************************************************
    // // Listen for Audio call notifications
    // // ***********************************************************
    // A Caller has been added to a call and is ringing
    this.bindSocketEvents()
    EventBus.on(BUS_EVENTS.SOCKET_CONNECTED, this.bindSocketEvents)
  }

  componentDidUpdate(prevProps) {
    // You are starting a call
    if (this.props.initiateCall && this.props.initiateCall !== prevProps.initiateCall) {
      let userData = {
        to_user: this.props.calleeUser.id,
      }

      this.sendSocketMessage(EVT_TRIGGER_AUDIO_CALL, userData)
      d(`EVT_TRIGGER_AUDIO_CALL >, user-id=${userData.to_user}, room=${userData.room}, data= %O`, userData)
    }
  }

  componentWillUnmount() {
    EventBus.off(BUS_EVENTS.SOCKET_CONNECTED, this.bindSocketEvents)
  }

  // Binds the Socket to this class
  bindSocketEvents() {
    // ST-6653 - check that socket is defined before subscribing to events
    // FIXME: These listeners should have a corresponding "off" handler, but I
    // don't think this component ever is supposed to get unmounted, so it's
    // probably not going to create a memory leak
    d(`Subscribing sockets events for Audio Calls`)
    Socket.on(EVT_AWAITING_PICKUP_AUDIO, data => {
      d(`socket-event: < EVT_AWAITING_PICKUP_AUDIO, room: ${data.room}`)
      const newState = {
        room: data.room,
      }
      this.setState(newState)
    })

    // An error occurred while calling
    Socket.on(EVT_ERROR_AUDIO_CALL, data => {
      d(`socket-event: < EVT_ERROR_AUDIO_CALL, room: ${data.room}, error ${data.error}`)
      this.setState({ error: data.error, showError: true })
    })

    // Call was completed
    Socket.on(EVT_COMPLETED_AUDIO_CALL, data => {
      d(`socket-event: < EVT_COMPLETED_AUDIO_CALL, room: ${data.room}`)
      this.props.onFinishCall()
    })
  }

  sendSocketMessage(message, data) {
    Socket.emit(message, data)
  }

  handleErrorClose() {
    this.setState({ error: '', showError: false })
    this.props.onFinishCall()
  }

  render() {
    const { calleeUser, initiateCall } = this.props

    const { error, showError } = this.state
    return (
      <CurrentUserContext.Consumer>
        {currentUser => {
          return (
            <>
              <CallNotice.Error show={showError} message={error} onCancel={this.handleErrorClose} />
              {currentUser.enterprise.uiV2 ? (
                <CallNotice.OutgoingAudio
                  show={initiateCall && !showError}
                  callingName={calleeUser.displayName || ''}
                  profileImage={calleeUser.profileImage || ''}
                />
              ) : (
                <OutgoingAudioCallNotice
                  show={initiateCall && !showError}
                  callingName={calleeUser.displayName}
                  profileImage={calleeUser.profileImage}
                />
              )}
            </>
          )
        }}
      </CurrentUserContext.Consumer>
    )
  }
}
