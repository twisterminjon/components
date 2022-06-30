import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CallButtonLabel.css'

export default class CallButtonLabel extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text } = this.props

    return <span className="callbuttonlabel">{text}</span>
  }
}
