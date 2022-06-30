import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'

import './ErrorCallNotice.css'

// REMOVE: after v2
export default class ErrorCallNotice extends Component {
  static propTypes = {
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
    /** Error Message received */
    errorMsg: PropTypes.string.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
  }
  static defaultProps = {
    seekingNewCallee: false,
    title: '',
    profileImage: '',
    onSkip: () => {},
    showSkipCall: false,
  }

  render() {
    const { errorMsg, show, onCancel } = this.props

    if (!show) return null

    return (
      <div className="errorcallnotice-wrap">
        <div className="errorcallnotice-dimmer" />
        <div className="errorcallnotice-content" data-testid="outgoing-audio-call-notice">
          <div className="errorcallnotice-calldetails">
            <div className="errorcallnotice-placeholder">
              <p className="errorcallnotice-calldetails-main">Cannot complete call...</p>
              <p>{errorMsg}</p>
            </div>
          </div>
          <div className={`errorcallnotice-buttons errorcallnotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
          </div>
        </div>
      </div>
    )
  }
}
