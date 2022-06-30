import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputMessage.css'

export default class InputMessage extends Component {
  static propTypes = {
    /** Test for the message */
    message: PropTypes.string.isRequired,
    /** If true, the message will be displayed */
    show: PropTypes.bool.isRequired,
  }

  render() {
    const { message, show } = this.props

    if (!show) return null

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : 'input-message'

    return (
      <span className="inputmessage" data-testid={dataTestId}>
        {message}
      </span>
    )
  }
}
