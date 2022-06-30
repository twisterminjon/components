import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './StatusBubble.css'
import { USER_STATUS_LIST } from '../../../constants'

export default class StatusBubble extends Component {
  static propTypes = {
    /** The status to to display in the bubble */
    status: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const { status, className, style } = this.props

    const colorClass = `statusbubble--${status}`

    return <div className={`statusbubble ${colorClass} ${className}`.trim()} style={style} />
  }
}
