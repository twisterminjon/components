import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextareaAutosize from 'react-autosize-textarea'

import {
  fileTypesMessageAttachments,
  imageTypesMessageAttachments,
  maxSecureMessageTextLength as maxTextLength,
} from '@app/care/src/config'
import { getFileExtension, loadImage } from '@shared/helpers'
import { DragAndDrop } from '@shared/components'
import IconAirplaneTop from '../../Atoms/Icons/IconAirplaneTop'
import MessageAttachmentButton from '../../Atoms/MessageAttachmentButton/MessageAttachmentButton'
import SendImageModal from '../SendImageModal/SendImageModal'

import './MessageTyper.css'

import debug from 'debug'
const d = debug('project:MessageTyper')

export default class MessageTyper extends Component {
  static propTypes = {
    /** Message value */
    message: PropTypes.string,

    /** Execute to set message value */
    setMessage: PropTypes.func,

    /** Can show a message on the component */
    generalMessage: PropTypes.string,

    /** Called when the message is sent */
    onSend: PropTypes.func.isRequired,

    /** ClassName for the wrapper */
    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    message: '',
    generalMessage: '',
    className: '',
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      badMessage: false,
      showDropMessage: false,
      validationFailedMessage: '',
      showPlaceholder: false,
      file: null,
      image: null,
    }

    this.inputRef = React.createRef()
    this.hiddenInput = React.createRef()

    this.handleSend = this.handleSend.bind(this)
  }

  componentDidUpdate() {
    // Focus only if there is not another focused DOM element
    if (!document.activeElement) {
      this.inputRef.current.focus()
    }
  }

  componentDidMount() {
    this.inputRef.current.focus()
    this.inputRef.current.selectionStart = this.inputRef.current.value.length
    this.inputRef.current.selectionEnd = this.inputRef.current.value.length
  }

  handleChange = e => {
    const value = e.target.value
    this.props.setMessage(value)

    if (value) {
      this.setState({ badMessage: false })
    }
  }

  handleSend() {
    // We don't send a file and text at the same time.
    // If a file is available, send that and leave the text alone
    if (this.state.file) {
      this.handleSendFile()
      return
    }

    if (this.props.message) {
      this.props.onSend(this.props.message)
      this.props.setMessage('')
      return
    }

    // handle empty/bad message
    this.setState({ badMessage: true })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      this.handleSend()
    }
  }

  handleDroppedFile = file => {
    d(`handle dropped file ${file.name}=%O`, file)
    this.resetDropState()

    if (imageTypesMessageAttachments.includes(getFileExtension(file.name))) {
      this.setState({ image: file })
    } else {
      this.setState({ showPlaceholder: true, file })
    }
  }

  handleSendFile = () => {
    this.props.onSend(null, this.state.file)

    this.resetDropState()
  }

  handleSendImage = async image => {
    this.resetDropState()

    let rightRotatedImage = await loadImage(image)
    this.props.onSend(null, rightRotatedImage)
  }

  handleValidationFailed = validationFailedMessage => {
    this.resetDropState()
    this.setState({ showDropMessage: true, validationFailedMessage })
  }

  handleCloseDropMessage = () => {
    this.resetDropState()
  }

  handleClosePlaceholder = () => {
    this.hiddenInput.current.value = ''
    this.resetDropState()
  }

  resetDropState = () => {
    this.setState({
      showDropMessage: false,
      showPlaceholder: false,
      file: null,
      image: null,
    })
  }

  render() {
    const { generalMessage, className, style, message } = this.props
    const { badMessage, showDropMessage, validationFailedMessage, showPlaceholder, file, image } = this.state

    const atMaxLength = message.length === maxTextLength

    return (
      <div className={`messagetyper-wrap ${className}`} style={style}>
        <DragAndDrop
          handleDrop={this.handleDroppedFile}
          allowedExtensions={fileTypesMessageAttachments}
          onValidationFailed={this.handleValidationFailed}>
          {dragOver => {
            return (
              <React.Fragment>
                {badMessage && (
                  <div className="messagetyper-notice" data-testid="message-empty-notice">
                    Please type a message before sending
                  </div>
                )}
                {!badMessage && !generalMessage && !atMaxLength && (
                  <span className="messagetyper-hint">Press Enter to send</span>
                )}

                {atMaxLength && (
                  <p className="messagetyper-max-length" data-testid="message-max-len-notice">
                    You can only enter {maxTextLength} characters
                  </p>
                )}
                {!atMaxLength && generalMessage && (
                  <p className="messagetyper-info" data-testid="message-general-msg">
                    {generalMessage}
                  </p>
                )}
                <div className={`messagetyper`}>
                  <MessageAttachmentButton
                    className="messagetyper-button-attach"
                    onClick={this.handleDroppedFile}
                    allowedExtensions={fileTypesMessageAttachments}
                    onValidationFailed={this.handleValidationFailed}
                    hiddenInput={this.hiddenInput}
                    data-testid="add-attachment-button"
                  />
                  <TextareaAutosize
                    placeholder="Type a new message"
                    className="messagetyper-input"
                    onChange={this.handleChange}
                    rows={1}
                    style={{ resize: 'none' }}
                    value={message}
                    data-testid="send-message-input"
                    onKeyPress={this.handleKeyPress}
                    ref={this.inputRef}
                    maxLength={maxTextLength}
                  />
                  <button className="messagetyper-button" onClick={this.handleSend} data-testid="send-message-button">
                    <IconAirplaneTop color="var(--brandcolor_dark)" size={20} />
                  </button>
                </div>
                {dragOver && <HoverMessage />}
                {showDropMessage && (
                  <DropMessage message={validationFailedMessage} onClose={this.handleCloseDropMessage} />
                )}
                {showPlaceholder && (
                  <FilePlaceholder
                    fileName={file.name}
                    onClose={this.handleClosePlaceholder}
                    onSend={this.handleSendFile}
                  />
                )}
              </React.Fragment>
            )
          }}
        </DragAndDrop>
        <SendImageModal
          show={Boolean(image)}
          file={image}
          onSend={this.handleSendImage}
          onClose={this.handleClosePlaceholder}
        />
      </div>
    )
  }
}

const HoverMessage = () => {
  return (
    <div className="messagetyper-hover">
      <span>Drop file here to send</span>
    </div>
  )
}

const DropMessage = ({ message, onClose }) => {
  return (
    <div className="messagetyper-hover messagetyper-hover-close" onClick={onClose}>
      <span>{message}</span>
    </div>
  )
}

const FilePlaceholder = ({ fileName, onClose, onSend }) => {
  return (
    <div className="messagetyper-hover messagetyper-hover-close" onClick={onClose}>
      <span>{`Send file ${fileName}?`}</span>
      <button className="messagetyper-button" onClick={onSend} autoFocus data-testid="send-message-button">
        <IconAirplaneTop color="var(--brandcolor_dark)" size={20} />
      </button>
    </div>
  )
}
