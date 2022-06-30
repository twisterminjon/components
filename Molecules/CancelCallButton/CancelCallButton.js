import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconDeclineCall from '../../Atoms/Icons/IconDeclineCall'
import CallButtonLabel from '../../Atoms/CallButtonLabel/CallButtonLabel'
import CallButton from '../../Atoms/CallButton/CallButton'

import './CancelCallButton.css'

export default class CancelCallButton extends Component {
  static propTypes = {
    /** If true, will display as ghost style */
    ghost: PropTypes.bool,
  }
  static defaultProps = {
    ghost: false,
  }

  render() {
    const { onClick, ghost } = this.props

    return (
      <div className="cancelcallbutton-wrap">
        <CallButton color="#ff4d4d" name="cancel-call" ghost={ghost} onClick={onClick} data-testid="button-cancel-call">
          <IconDeclineCall />
        </CallButton>
        <CallButtonLabel text="Cancel Call" />
      </div>
    )
  }
}
