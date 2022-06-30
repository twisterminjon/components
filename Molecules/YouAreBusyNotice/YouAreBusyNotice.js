import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'

import './YouAreBusyNotice.css'

export default class YouAreBusyNotice extends Component {
  static propTypes = {
    /** Can be shown when needed */
    show: PropTypes.bool.isRequired,
    /** Called after the cancel button is clicked */
    onCancel: PropTypes.func.isRequired,
  }

  render() {
    const { show, onCancel } = this.props

    if (!show) return null

    return (
      <div className="youarebusynotice-wrap">
        <div className="youarebusynotice-dimmer" />
        <div className="youarebusynotice-content">
          <div className="youarebusynotice-message">
            <span>You are already on a call on another device.</span>
            <span>Please end your other calls before starting a new one.</span>
          </div>
          <div className={`youarebusynotice-buttons youarebusynotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
          </div>
        </div>
      </div>
    )
  }
}
