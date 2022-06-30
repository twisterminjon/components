import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RetryCallButton from '../../Molecules/RetryCallButton/RetryCallButton'
import CancelCallButton from '../../Molecules/CancelCallButton/CancelCallButton'
import UserCardLarge from '../../Molecules/UserCardLarge/UserCardLarge'

import './NoAnswerNotice.css'

export default class NoAnswerNotice extends Component {
  static propTypes = {
    /** Then name of the person being called */
    callingName: PropTypes.string.isRequired,
    /** the url to the callers profile pic */
    profileImage: PropTypes.string,
    /** If true, will display the form */
    show: PropTypes.bool.isRequired,
    /** A function to run when the cancel call button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** A function to run when the retry button button is clicked */
    onRetry: PropTypes.func.isRequired,
  }
  static defaultProps = {
    title: '',
    profileImage: '',
  }
  render() {
    const { callingName, show, profileImage, onCancel, onRetry } = this.props

    if (!show) return null

    return (
      <div className="noanswernotice-wrap">
        <div className="noanswernotice-dimmer" />
        <div className="noanswernotice-content" data-testid="no-answer-notice">
          <UserCardLarge userName="" profileImage={profileImage} style={{ marginBottom: -50 }} />
          <div>
            <span className="noanswernotice-notice">{callingName} didn't answer.</span>
            <span className="noanswernotice-notice">Would you like to retry?</span>
          </div>
          <div className={`noanswernotice-buttons noanswernotice-buttons-center`}>
            <CancelCallButton ghost={true} onClick={onCancel} />
            <RetryCallButton onClick={onRetry} />
          </div>
        </div>
      </div>
    )
  }
}
