import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'

import './CallCompletedNotice.css'

export default class CallCompletedNotice extends Component {
  static propTypes = {
    /** If true, will display notice */
    show: PropTypes.bool.isRequired,
    /** A function to run when the cancel button is clicked */
    onCancel: PropTypes.func.isRequired,
  }

  render() {
    const { show, onCancel } = this.props

    if (!show) return null

    return (
      <div className="callcompletednotice-wrap">
        <div className="callcompletednotice-dimmer" />
        <div className="callcompletednotice-content">
          <div>
            <span className="callcompletednotice-notice">Your meeting has ended.</span>
            <span className="callcompletednotice-notice">The other participants are no longer on the call</span>
          </div>
          <div className={`callcompletednotice-buttons callcompletednotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
          </div>
        </div>
      </div>
    )
  }
}
