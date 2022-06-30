import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'

import './OfflineCallNotice.css'

export default class OfflineCallNotice extends Component {
  static propTypes = {
    /** If true, will display notice */
    show: PropTypes.bool.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** Function to redirect to dashboard according to Data */
    onGoToDashboard: PropTypes.func.isRequired,
  }

  render() {
    const { show, onCancel, onGoToDashboard } = this.props

    if (!show) return null

    const handleReturn = () => {
      onCancel()
      onGoToDashboard()
    }

    return (
      <div className="offlinecallnotice-wrap">
        <div className="offlinecallnotice-dimmer" />
        <div className="offlinecallnotice-content">
          <div>
            <span className="offlinecallnotice-notice offlinecallnotice-notice-title">Oops... Call is over.</span>

            <span className="offlinecallnotice-notice">
              Something happened to the connection and the other person is no longer on the call.
            </span>
          </div>
          <div className={`offlinecallnotice-buttons offlinecallnotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={handleReturn} />
          </div>
        </div>
      </div>
    )
  }
}
