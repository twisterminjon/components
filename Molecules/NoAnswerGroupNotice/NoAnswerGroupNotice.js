import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RetryCallButton from '../../Molecules/RetryCallButton/RetryCallButton'
import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'

import './NoAnswerGroupNotice.css'

export default class NoAnswerGroupNotice extends Component {
  static propTypes = {
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** A function to run when the retry button button is clicked */
    onRetry: PropTypes.func.isRequired,
  }
  static defaultProps = {
    title: '',
    profilePic: '',
  }
  render() {
    const { show, onCancel, onRetry } = this.props

    if (!show) return null

    return (
      <div className="noanswergroupnotice-wrap">
        <div className="noanswergroupnotice-dimmer" />
        <div className="noanswergroupnotice-content">
          <div>
            <span className="noanswergroupnotice-notice ">No one was available</span>
            <span className="noanswergroupnotice-notice">to answer your call.</span>
            <span className="noanswergroupnotice-notice">Would you like to retry?</span>
          </div>
          <div className={`noanswergroupnotice-buttons noanswergroupnotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
            <RetryCallButton onClick={onRetry} />
          </div>
        </div>
      </div>
    )
  }
}
