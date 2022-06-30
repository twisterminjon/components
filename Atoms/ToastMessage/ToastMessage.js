import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ToastMessage.css'

export default class ToastMessage extends Component {
  static propTypes = {
    /** If true, will show the message */
    show: PropTypes.bool.isRequired,
    /** Message to display */
    message: PropTypes.string,
    /** Type of message to display */
    type: PropTypes.oneOf(['error', 'warning', 'info']).isRequired,
    /** If true, will cover the screen w/ a dimmer that disables input */
    disableInput: PropTypes.bool,
  }
  static defaultProps = {
    disableInput: false,
  }

  render() {
    const { type, message, show, disableInput } = this.props

    const visibility = show ? 'toastmessage--show' : 'toastmessage--hide'
    const dimmerVisibility = disableInput && show ? 'toastmessage-dimmer--show' : 'toastmessage-dimmer--hide'

    const messageColor = `toastmessage--${type}`

    return (
      <React.Fragment>
        <div className={`toastmessage ${visibility} ${messageColor}`}>
          {message ? <span className="toastmessage-text">{message}</span> : this.props.children}
        </div>
        <div className={`toastmessage-dimmer ${dimmerVisibility} `} />
      </React.Fragment>
    )
  }
}
