import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconCloseX from '../Icons/IconCloseX'

import './ToastMessage.css'

export default class ToastMessageClosable extends Component {
  static propTypes = {
    /** Called when the message closes */
    onClose: PropTypes.func,
    /** Message to display */
    message: PropTypes.string.isRequired,
    /** Type of message to display */
    type: PropTypes.oneOf(['error', 'warning', 'info']).isRequired,
  }
  static defaultProps = {
    disableInput: false,
    onClose: () => {},
  }

  state = { show: true }

  handleClose = () => {
    this.setState({ show: false })
    this.props.onClose()
  }

  render() {
    const { type, message } = this.props
    const { show } = this.state

    const visibility = show ? 'toastmessage--show' : 'toastmessage--hide'

    const messageColor = `toastmessage--${type}`

    return (
      <React.Fragment>
        <div className={`toastmessage ${visibility} ${messageColor}`}>
          <span className="toastmessage-text">{message}</span>
          <button className="toastmessage-button-wrap" onClick={this.handleClose} data-testid="message-close-button">
            <IconCloseX className="toastmessage-close-icon" />
          </button>
        </div>
      </React.Fragment>
    )
  }
}
