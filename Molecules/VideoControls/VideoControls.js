import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MuteAudioButton from '../MuteAudioButton/MuteAudioButton'
import MuteVideoButton from '../MuteVideoButton/MuteVideoButton'
import DeclineCallButton from '../DeclineCallButton/DeclineCallButton'

import './VideoControls.css'

export default class VideoControls extends Component {
  static propTypes = {
    /** If true, the controls will be displayed */
    show: PropTypes.bool.isRequired,

    /** Function called when the hangup button clicked */
    onHangup: PropTypes.func.isRequired,

    /** Function called when the mute audio button is clicked */
    onMuteAudio: PropTypes.func.isRequired,

    /** Function called when the mute video button is clicked */
    onMuteVideo: PropTypes.func.isRequired,

    /** If true, the audio button will show in the muted state */
    audioMuted: PropTypes.bool,

    /** If true, the video button will show in the muted state */
    videoMuted: PropTypes.bool,
  }

  render() {
    const { show, onHangup, onMuteAudio, onMuteVideo, audioMuted, videoMuted } = this.props

    const visible = show ? 'videocontrols-show' : 'videocontrols-hide'

    return (
      <div className={`videocontrols ${visible}`}>
        <MuteAudioButton
          showLabel={false}
          wrapStyle={{ margin: '10px 36px 0 0' }}
          onClick={onMuteAudio}
          muted={audioMuted}
        />
        <DeclineCallButton onClick={onHangup} showLabel={false} wrapStyle={{ margin: '10px 36px 0 0' }} />
        <MuteVideoButton
          showLabel={false}
          wrapStyle={{ margin: '10px 0 0 0' }}
          onClick={onMuteVideo}
          muted={videoMuted}
        />
      </div>
    )
  }
}
