import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconDeclineCall from '../../Atoms/Icons/IconDeclineCall'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './DeclineCallButton.css'

export default class DeclineCallButton extends Component {
  static propTypes = {
    /** If true, will display as ghost style */
    ghost: PropTypes.bool,
    /** If true, whill display the button label */
    showLabel: PropTypes.bool,
    /** Style for wrapper element */
    wrapStyle: PropTypes.object,
    /** Function called when clicked */
    onClick: PropTypes.func.isRequired,
  }
  static defaultProps = {
    ghost: false,
    showLabel: true,
  }

  render() {
    const { onClick, ghost, showLabel, wrapStyle } = this.props

    const label = showLabel ? <CallButtonLabel text="Decline" /> : null

    return (
      <div className="declinecallbutton-wrap" style={wrapStyle}>
        <CallButton color="#ff4d4d" name="decline-call" ghost={ghost} onClick={onClick}>
          <IconDeclineCall />
        </CallButton>

        {label}
      </div>
    )
  }
}
