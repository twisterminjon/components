import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SkipCallButton from '../../Molecules/SkipCallButton/SkipCallButton'
import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'
import UserCardLarge from '../../Molecules/UserCardLarge/UserCardLarge'
import { getRingVolume } from '@shared/helpers'
import soundRingtoneOut from '../../../sounds/ringtone-out.mp3'

import './OutgoingCallNotice.css'

export default class OutgoingCallNotice extends Component {
  static propTypes = {
    /** Then name of the person being called */
    callingName: PropTypes.string.isRequired,
    /** Title of the person calling  */
    title: PropTypes.string,
    /** the url to the callers profile pic */
    profileImage: PropTypes.string,
    /** Can show a different display when finding a user to call */
    seekingNewCallee: PropTypes.bool,
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
    /** If true will show the skip call button */
    showSkipCall: PropTypes.bool.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** A function to run when the skip button button is clicked */
    onSkip: PropTypes.func.isRequired,
  }
  static defaultProps = {
    seekingNewCallee: false,
    title: '',
    profileImage: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show && prevProps !== this.props.show) {
      this.updateVolume()
    }
  }

  updateVolume() {
    if (!this.audioEl) return

    const volume = getRingVolume()
    if (typeof volume === 'number' && volume !== this.audioEl.volume) {
      this.audioEl.volume = volume
    }
  }

  render() {
    const { callingName, show, title, profileImage, seekingNewCallee, onCancel, onSkip, showSkipCall } = this.props

    if (!show) return null

    const buttonSpacing = showSkipCall ? 'outgoingcallnotice-buttons-spaced' : 'outgoingcallnotice-buttons-center'

    return (
      <div className="outgoingcallnotice-wrap">
        <div className="outgoingcallnotice-dimmer" />
        <div className="outgoingcallnotice-content" data-testid="outgoing-call-notice">
          {seekingNewCallee ? (
            <div className="outgoingcallnotice-placeholder">
              <p>Finding next available...</p>
            </div>
          ) : (
            <UserCardLarge
              userName={callingName}
              title={title}
              profileImage={profileImage}
              actionText={'Calling...'}
              style={{ marginBottom: 60 }}
            />
          )}
          <div className={`outgoingcallnotice-buttons ${buttonSpacing}`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
            {showSkipCall && <SkipCallButton onClick={onSkip} />}
          </div>
          <audio
            loop="loop"
            autoPlay="autoplay"
            ref={ref => {
              this.audioEl = ref
            }}>
            <source src={soundRingtoneOut} type="audio/mpeg" />
            Sorry, your browser does audio for playing ringtones.
          </audio>
        </div>
      </div>
    )
  }
}
