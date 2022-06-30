import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import IconTimes from '../../Atoms/Icons/IconTimes'
import ImageEditor from '../ImageEditor/ImageEditor'
import FileSelect from '../FileSelect/FileSelect'
import { FILE_NOT_ALLOWED } from '../../../constants'

import './ImageUploadModal.css'

ImageUploadModal.propTypes = {
  /** Can show a loader */
  loading: PropTypes.bool,

  /** Called after modal has closed */
  onClose: PropTypes.func.isRequired,

  /** Called after the save action */
  onSave: PropTypes.func.isRequired,

  /** Can show specific title */
  title: PropTypes.string,
}
ImageUploadModal.defaultProps = {
  loading: false,
  title: 'Provide photo',
}

export default function ImageUploadModal({ title, loading, onSave, onClose }) {
  const [image, setImage] = useState(null)

  const handleSave = imageData => {
    // We need to handle bad images and reset so the picker shows
    if (imageData === FILE_NOT_ALLOWED) {
      toast.warn('Sorry, the file could not be uploaded. Please try another file.')
      setImage(null)
    } else {
      onSave(imageData)
    }
  }

  return (
    <div className="imageuploadmodal-dimmer-screen" data-testid="page-pic-upload">
      <div className="imageuploadmodal-wrap">
        <div className="imageuploadmodal-header">
          <span className="imageuploadmodal-text">{image ? 'Move and scale' : title}</span>
          <button className="button-reset imageuploadmodal-close" onClick={onClose} data-testid="button-close-upload">
            <IconTimes color="var(--base__body_fg)" size={20} />
          </button>
        </div>
        <div className="imageuploadmodal-content">
          {image ? (
            <ImageEditor
              loading={loading}
              file={image}
              onSave={handleSave}
              onClose={onClose}
              showCircularCropping={false}
            />
          ) : (
            <FileSelect onSelected={setImage} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
