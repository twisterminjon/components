import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserCardLarge from '../../Molecules/UserCardLarge/UserCardLarge'

import './OutgoingAudioCallNotice.css'

export default class OutgoingAudioCallNotice extends Component {
  static propTypes = {
    /** Then name of the person being called */
    callingName: PropTypes.string,
    /** Title of the person calling  */
    title: PropTypes.string,
    /** the url to the callers profile pic */
    profileImage: PropTypes.string,
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    seekingNewCallee: false,
    title: '',
    callingName: '',
    profileImage: '',
    onSkip: () => {},
    showSkipCall: false,
  }

  render() {
    const { callingName, show, title, profileImage } = this.props

    if (!show) return null
    return (
      <div className="outgoingaudiocallnotice-wrap">
        <div className="outgoingaudiocallnotice-dimmer" />
        <div className="outgoingaudiocallnotice-content" data-testid="outgoing-audio-call-notice">
          <div className="outgoingaudiocallnotice-calldetails">
            <div style={{ height: 300, marginBottom: 10 }}>
              <UserCardLarge
                userName={callingName}
                title={title}
                profileImage={profileImage}
                actionText={'Calling...'}
              />
            </div>
            <div className="outgoingaudiocallnotice-placeholder">
              <p className="outgoingaudiocallnotice-calldetails-main">Your audio call is in progress.</p>
              <p className="outgoingaudiocallnotice-calldetails-text">
                When connected, you can join the call on your phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
