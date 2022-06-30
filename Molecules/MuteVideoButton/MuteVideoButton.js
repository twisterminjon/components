import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconVideoCamera from '../../Atoms/Icons/IconVideoCamera'
import IconVideoCameraMuted from '../../Atoms/Icons/IconVideoCameraMuted'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './MuteVideoButton.css'
import Styles from '../../../styles/Style'

export default class MuteVideoButton extends Component {
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
  }

  render() {
    const { onClick, showLabel, muted, wrapStyle } = this.props

    const label = showLabel ? <CallButtonLabel text="Mute Video" /> : null
    const icon = muted ? <IconVideoCameraMuted /> : <IconVideoCamera />

    return (
      <div className="mutevideobutton-wrap" style={wrapStyle}>
        <CallButton color={Styles.brandcolorDark} name="mute-video" ghost={true} onClick={onClick} ghostOpacity={0.6}>
          {icon}
        </CallButton>

        {label}
      </div>
    )
  }
}
