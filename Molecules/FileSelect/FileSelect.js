import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

import { prettyBytes, FILE_MAX_UPLOAD_SIZE, PIC_ALLOWED_FILE_TYPES_MIME } from '@shared/helpers'

import './FileSelect.css'

import debug from 'debug'
const d = debug('project:FileSelect')

FileSelect.propTypes = {
  /** Called after a file is selected */
  onSelected: PropTypes.func.isRequired,

  /** Called after a file is rejected from drag/drop */
  onRejected: PropTypes.func,
}
FileSelect.defaultProps = {
  onRejected: () => {},
}

/**
 * Display a target to allow selecting a file by dragging and dropping or using file select
 */
export default function FileSelect({ show, onSelected, onRejected }) {
  const [validationMessage, setValidationMessage] = useState(null)

  const handleAccept = files => {
    onSelected(files[0])
  }

  const handleReject = files => {
    let response = ''
    const code = files[0].errors[0].code

    if (code === 'file-invalid-type') {
      const fileTypes = PIC_ALLOWED_FILE_TYPES_MIME.replace(/image\//gi, '') // remove the "image/" from the string
      response = `You can only upload the following types of files: ${fileTypes}`
    }

    if (code === 'file-too-large') {
      response = `File size must be under ${prettyBytes(FILE_MAX_UPLOAD_SIZE)}`
    }

    if (response === '') response = "We're sorry but that file can not be uploaded"

    d(`file rejected: ${code}`, files[0])
    setValidationMessage(response)
    onRejected(files[0])
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: handleAccept,
    onDropRejected: handleReject,
    maxSize: FILE_MAX_UPLOAD_SIZE,
    multiple: false,
    accept: PIC_ALLOWED_FILE_TYPES_MIME,
  })

  return (
    <section className="fileselect-wrap" data-testid="file-select">
      <div {...getRootProps({ className: 'fileselect-target' })}>
        <input {...getInputProps()} data-testid="file-select-input" />
        <p>Drag 'n' drop your image here, or click to select a file</p>

        {validationMessage && (
          <p className="fileselect-target-warning" data-testid="file-select-validation">
            {validationMessage}
          </p>
        )}
      </div>
    </section>
  )
}
