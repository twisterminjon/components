import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ThreadListCard.css'

export default class ThreadListCardPlaceholder extends Component {
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
      <div className={`messagelistcard-ph ${className}`} style={{ animationDelay: delay + 's', ...style }}>
        <div className="messagelistcard-ph-avatar" />
        <div className="messagelistcard-ph-text" />
      </div>
    )
  }
}
