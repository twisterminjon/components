import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Cropper } from '@shared/components'
import IconTimes from '../../Atoms/Icons/IconTimes'
import Button from '../../Atoms/Button/Button'

import './SendImageModal.css'

SendImageModal.propTypes = {
  /** Modal is visible */
  show: PropTypes.bool.isRequired,

  /** Called after the send action */
  onSend: PropTypes.func.isRequired,

  /** Called after the close action */
  onClose: PropTypes.func.isRequired,
}

export default function SendImageModal({ show, file, onSend, onClose }) {
  const [croppedImage, setCroppedImage] = useState()
  const [cropIsInProgress, setCropIsInProgress] = useState(true)

  useEffect(() => {
    if (show) setCroppedImage(undefined)
  }, [show])

  const handleSend = useCallback(() => {
    onSend(croppedImage)
  }, [onSend, croppedImage])

  const modalClass = `sendimagemodal-dimmer-screen ${show ? 'sendimagemodal-visible' : ''}`.trim()

  return (
    <div className={modalClass} data-testid="send-image-modal">
      <div className="sendimagemodal-wrap">
        <div className="sendimagemodal-header">
          <span className="sendimagemodal-text">Crop Image</span>
          <button className="button-reset sendimagemodal-close" onClick={onClose} data-testid="button-close-send-image">
            <IconTimes color="var(--base__body_fg)" size={20} />
          </button>
        </div>
        <div className="sendimagemodal-content">
          {file && (
            <Cropper
              cropProps={{ unit: '%', width: 90, height: 90, x: 5, y: 5 }}
              handleCropIsInProgress={setCropIsInProgress}
              handleChange={setCroppedImage}
              file={file}
            />
          )}
        </div>
        <div className="sendimagemodal-footer">
          <Button disabled={cropIsInProgress} fluid onClick={handleSend} data-testid="send-image">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
