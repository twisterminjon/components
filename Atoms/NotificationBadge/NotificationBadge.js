import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NotificationBadge.css'

export default class NotificationBadge extends Component {
  static propTypes = {
    /** The number to show in the bubble */
    count: PropTypes.number.isRequired,

    /** Can display as negative information*/
    negative: PropTypes.bool,
  }
  static defaultProps = {
    negative: false,
    className: '',
    style: {},
  }

  render() {
    const { count, negative, className, style } = this.props

    // Only show up to 99
    const countToShow = count > 99 ? '99+' : count

    const backgroundClass = negative ? 'notificationbadge--negative' : ''

    return (
      <div className={`notificationbadge ${backgroundClass} ${className}`.trim()} style={style}>
        <span className="notificationbadge-notification" data-testid="notificationbadge">
          {countToShow}
        </span>
      </div>
    )
  }
}
