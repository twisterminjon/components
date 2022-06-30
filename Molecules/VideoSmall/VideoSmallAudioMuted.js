import React, { Component } from 'react'

import IconMicrophoneMuted from '../../Atoms/Icons/IconMicrophoneMuted'

import './VideoSmall.css'
import Styles from '../../../styles/Style'

export default class VideoSmallPlaceholder extends Component {
  render() {
    return <IconMicrophoneMuted color={Styles.brandColor} className="videosmall-placholder-icon-audio" />
  }
}
