import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconPlus from '../../Atoms/Icons/IconPlus'
import { getFileExtension, checkFileType, prettyBytes } from '@shared/helpers'

import './MessageAttachmentButton.css'

import debug from 'debug'
const d = debug('project:MessageAttachmentButton')

export default class MessageAttachmentButton extends Component {
  static propTypes = {
    /** Called after an image has been selected */
    onClick: PropTypes.func.isRequired,
    /** Can limit file types to a specified list, ex: ['jpg', 'png'] */
    allowedExtensions: PropTypes.array,
    /** Max file size for file */
    maxSize: PropTypes.number,
    /** Called after a validation has failed  */
    onValidationFailed: PropTypes.func,
    /** Ref on hidden input */
    hiddenInput: PropTypes.object.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
    /** If true, attachments cannot be added */
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    allowedExtensions: [],
    maxSize: 10000000,
    onValidationFailed: () => {},
    className: '',
    style: {},
  }

  handleFileUpload = e => {
    let failedValidationMessage = null
    const firstFile = e.target.files[0]

    // Check for valid file type
    if (this.props.allowedExtensions.length > 0) {
      failedValidationMessage = this.checkFileType(firstFile.name, this.props.allowedExtensions)
    }

    // Check for valid file size
    if (!failedValidationMessage) {
      failedValidationMessage = this.checkFileSize(firstFile.size, this.props.maxSize)
    }

    failedValidationMessage ? this.props.onValidationFailed(failedValidationMessage) : this.props.onClick(firstFile)

    this.props.hiddenInput.current.value = ''
  }

  checkFileType = (filename, extensions) => {
    const extension = getFileExtension(filename)

    // success
    if (checkFileType(filename, extensions)) return ''

    // fail
    d(`File type ${extension} failed validation. Allowed=${extensions}`)
    return `File must be a ${this.props.allowedExtensions.join(', ')}`
  }

  checkFileSize = (size, maxSize) => {
    // success
    if (size <= maxSize) return ''

    // fail
    d(`File size of ${size} failed validation. Allowed=${maxSize}`)
    return `File must be less than ${prettyBytes(maxSize)}`
  }

  render() {
    const { className, style, hiddenInput, disabled } = this.props
    return (
      <div className={`messageattachmentbutton ${className}`.trim()} style={style}>
        {/* This input is hidden and called by the button to show the file selector */}
        <input
          id="myInput"
          type="file"
          ref={hiddenInput}
          style={{ display: 'none' }}
          disabled={disabled}
          onChange={this.handleFileUpload}
        />

        <button
          className="messageattachmentbutton-button messageattachmentbutton-button-attach"
          onClick={() => {
            hiddenInput.current.click()
          }}
          data-testid="add-attachment-button"
          disabled={disabled}>
          <IconPlus color="var(--brandcolor_dark)" size={20} />
        </button>
      </div>
    )
  }
}
