import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MessageBanner.css'

export default class MessageBanner extends Component {
  static propTypes = {
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
    const { className, style } = this.props

    return <div className={`messagebanner button-spinner ${className}`} style={style} />
  }
}
