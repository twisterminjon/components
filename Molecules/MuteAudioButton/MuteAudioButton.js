import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconMicrophone from '../../Atoms/Icons/IconMicrophone'
import IconMicrophoneMuted from '../../Atoms/Icons/IconMicrophoneMuted'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './MuteAudioButton.css'
import Styles from '../../../styles/Style'

export default class MuteAudioButton extends Component {
  static propTypes = {
    /** If true, whill display the button label */
    showLabel: PropTypes.bool,
    /** If true, will display the muted icon */
    muted: PropTypes.bool,
    /** Style for wrapper element */
    wrapStyle: PropTypes.object,
    /** Function called when clicked */
    onClick: PropTypes.func.isRequired,
  }
  static defaultProps = {
    showLabel: true,
    muted: false,
    wrapStyle: {},
  }

  render() {
    const { onClick, showLabel, muted, wrapStyle } = this.props

    const label = showLabel ? <CallButtonLabel text="Mute Audio" /> : null
    const icon = muted ? <IconMicrophoneMuted /> : <IconMicrophone />

    return (
      <div className="muteaudiobutton-wrap" style={wrapStyle}>
        <CallButton color={Styles.brandcolorDark} name="mute-audio" ghost={true} onClick={onClick} ghostOpacity={0.6}>
          {icon}
        </CallButton>

        {label}
      </div>
    )
  }
}
