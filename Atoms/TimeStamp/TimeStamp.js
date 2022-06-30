import React, { Component } from 'react'
import PropTypes from 'prop-types'

import friendlyTime from 'friendly-time'
import dayjs from 'dayjs'

import './TimeStamp.css'

export default class TimeStamp extends Component {
  static propTypes = {
    /** A timestamp in UTC ISO format */
    timestamp: PropTypes.string.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    timestamp: '',
    className: '',
    style: {},
  }

  render() {
    const { timestamp, className, style, ...rest } = this.props

    // convert timestamp to local time and then friendly it up!
    const localTimeStamp = dayjs
      .utc(timestamp)
      .local()
      .toDate()
    const niceTime = friendlyTime(localTimeStamp)

    return (
      <span className={`timestamp  ${className}`} style={style} {...rest}>
        {niceTime}
      </span>
    )
  }
}
