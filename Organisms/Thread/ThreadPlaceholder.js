import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ThreadPlaceholder extends Component {
  static propTypes = {
    /** Amount of time (in seconds) to wait before starting the animation */
    delay: PropTypes.number,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    delay: 0,
    className: '',
    style: {},
  }

  render() {
    const { delay, className, style } = this.props

    return (
      <div className={`messagethread-ph ${className}`} style={{ animationDelay: delay + 's', ...style }}>
        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-sent">
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-sent" style={{ width: 100 }}>
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 500 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 200 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-sent">
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 200 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-sent">
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-sent" style={{ width: 100 }}>
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 500 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 200 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>

        <div className="messagethread-ph-sent">
          <div className="messagethread-ph-sent-text" />
          <div className="messagethread-ph-sent-time" />
        </div>

        <div className="messagethread-ph-received">
          <div className="messagethread-ph-avatar" />
          <div className="messagethread-ph-received-message">
            <div className="messagethread-ph-received-text" style={{ width: 200 }} />
            <div className="messagethread-ph-received-time" />
          </div>
        </div>
      </div>
    )
  }
}

export function PlaceholderMessages() {
  return (
    <div className="messagethread-ph-messages">
      <div className="messagethread-ph-received">
        <div className="messagethread-ph-avatar" />
        <div className="messagethread-ph-received-message">
          <div className="messagethread-ph-received-text" />
          <div className="messagethread-ph-received-time" />
        </div>
      </div>
      <div className="messagethread-ph-sent">
        <div className="messagethread-ph-sent-text" />
        <div className="messagethread-ph-sent-time" />
      </div>
      <div className="messagethread-ph-sent" style={{ width: 100 }}>
        <div className="messagethread-ph-sent-text" />
        <div className="messagethread-ph-sent-time" />
      </div>
      <div className="messagethread-ph-received">
        <div className="messagethread-ph-avatar" />
        <div className="messagethread-ph-received-message">
          <div className="messagethread-ph-received-text" style={{ width: 500 }} />
          <div className="messagethread-ph-received-time" />
        </div>
      </div>
      <div className="messagethread-ph-received">
        <div className="messagethread-ph-avatar" />
        <div className="messagethread-ph-received-message">
          <div className="messagethread-ph-received-text" style={{ width: 200 }} />
          <div className="messagethread-ph-received-time" />
        </div>
      </div>
      <div className="messagethread-ph-sent">
        <div className="messagethread-ph-sent-text" />
        <div className="messagethread-ph-sent-time" />
      </div>
    </div>
  )
}
