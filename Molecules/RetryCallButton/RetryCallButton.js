import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconRetryCall from '../../Atoms/Icons/IconRetryCall'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './RetryCallButton.css'
import Styles from '../../../styles/Style'

export default class RetryCallButton extends Component {
  static propTypes = {
    /** If true, will show the button label */
    showLabel: PropTypes.bool,
    /** Style for wrapper element */
    wrapStyle: PropTypes.object,
  }
  static defaultProps = {
    showLabel: true,
    wrapStyle: {},
  }

  render() {
    const { onClick, showLabel, wrapStyle } = this.props

    const label = showLabel ? <CallButtonLabel text="Retry Call" /> : null

    return (
      <div className="retrycallbutton-wrap" style={wrapStyle}>
        <CallButton color={Styles.availableColor} name="retry-call" ghost={false} onClick={onClick} ghostOpacity={0.2}>
          <IconRetryCall />
        </CallButton>

        {label}
      </div>
    )
  }
}
