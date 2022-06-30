import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getRingVolume } from '@shared/helpers'

import AnswerCallButton from '../../Molecules/AnswerCallButton/AnswerCallButton'
import DeclineCallButton from '../../Molecules/DeclineCallButton/DeclineCallButton'
import UserCardLarge from '../../Molecules/UserCardLarge/UserCardLarge'

import './IncomingCallNotice.css'
import ring from '../../../sounds/ringtone.mp3'

export default class IncomingCallNotice extends Component {
  static propTypes = {
    /** Then name of the person calling */
    callerName: PropTypes.string.isRequired,
    /** Title of the person calling  */
    title: PropTypes.string,
    /** the url to the callers profile pic */
    profileImage: PropTypes.string,
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
    /** A function to call when the answer button is clicked */
    onAnswer: PropTypes.func.isRequired,
    /** A function to run when the cancel call button is clicked */
    onIgnore: PropTypes.func.isRequired,
    /** Related patient name, if available */
    relatedCallerName: PropTypes.string,
    /** Related patient profile image, if available */
    relatedProfileImage: PropTypes.string,
  }
  static defaultProps = {
    title: '',
    profileImage: '',
  }

  state = { ringerVolume: 0.5 }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show && prevProps.show !== this.props.show) {
      this.updateVolume()
    }
  }

  updateVolume(newVolume = -1) {
    if (!this.audioEl) return

    const volume = getRingVolume()
    if (typeof volume === 'number' && volume !== this.audioEl.volume) {
      this.audioEl.volume = volume
    }
  }

  render() {
    const {
      callerName,
      title,
      profileImage,
      show,
      onAnswer,
      onIgnore,
      relatedCallerName,
      relatedProfileImage,
    } = this.props
    if (!show) return null

    return (
      <div className="incomingcallnotice-wrap">
        <div className="incomingcallnotice-dimmer" />
        <div className="incomingcallnotice-content" data-testid="incoming-call-notice">
          <UserCardLarge
            userName={callerName}
            relatedUserName={relatedCallerName}
            title={title}
            profileImage={profileImage}
            relatedProfileImage={relatedProfileImage}
            actionText={'Incoming Call'}
            style={{ marginBottom: 60 }}
          />

          <div className="incomingcallnotice-buttons">
            <AnswerCallButton onClick={onAnswer} />
            <DeclineCallButton ghost={true} onClick={onIgnore} />
          </div>

          <audio
            loop="loop"
            autoPlay="autoplay"
            ref={ref => {
              this.audioEl = ref
            }}>
            <source src={ring} type="audio/mpeg" />
            Sorry, your browser does audio for playing ringtones.
          </audio>
        </div>
      </div>
    )
  }
}
