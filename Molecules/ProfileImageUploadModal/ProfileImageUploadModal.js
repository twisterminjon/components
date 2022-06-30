import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import IconTimes from '../../Atoms/Icons/IconTimes'
import ImageEditor from '../ImageEditor/ImageEditor'
import FileSelect from '../FileSelect/FileSelect'
import ImageToast from './ImageToast'
import { FILE_NOT_ALLOWED } from '../../../constants'

import './ProfileImageUploadModal.css'

ProfileImageUploadModal.propTypes = {
  /** Can show a toast with options */
  showOptions: PropTypes.bool,

  /** Can show a loader */
  loading: PropTypes.bool,

  /** Can show a loader on the toasts remove button */
  loadingRemove: PropTypes.bool,

  /** Called after modal has closed */
  onClose: PropTypes.func.isRequired,

  /** Called after the save action */
  onSave: PropTypes.func.isRequired,

  /** Called after the remove action */
  onRemove: PropTypes.func.isRequired,
}
ProfileImageUploadModal.defaultProps = {
  showOptions: false,
  loading: false,
  loadingRemove: false,
}

export default function ProfileImageUploadModal({ showOptions, loading, loadingRemove, onSave, onRemove, onClose }) {
  const [image, setImage] = useState(null)
  const [showToast, setShowToast] = useState(false)

  // We will show the toast only when we have a profile image
  useEffect(() => {
    if (showOptions) setShowToast(true)
  }, [showOptions])

  const handleSelected = file => {
    setImage(file)
  }

  const handleSave = imageData => {
    // We need to handle bad images and reset so the picker shows
    if (imageData === FILE_NOT_ALLOWED) {
      toast.warn('Sorry, the file could not be uploaded. Please try another file.')
      setImage(null)
    } else {
      onSave(imageData)
    }
  }

  const title = image ? 'Move and scale' : 'Add profile picture'

  if (showToast) {
    return (
      <ImageToast
        show={true}
        loadingRemove={loadingRemove}
        onRemoveImage={onRemove}
        onSelectImage={() => {
          setShowToast(false)
        }}
        onClose={onClose}
      />
    )
  }

  return (
    <div className="profileimageuploadmodal-dimmer-screen" data-testid="page-pic-upload">
      <div className="profileimageuploadmodal-wrap">
        <div className="profileimageuploadmodal-header">
          <span className="profileimageuploadmodal-text">{title}</span>
          <button
            className="button-reset profileimageuploadmodal-close"
            onClick={onClose}
            data-testid="button-close-upload">
            <IconTimes color="var(--base__body_fg)" size={20} />
          </button>
        </div>
        <div className="profileimageuploadmodal-content">
          {image ? (
            <ImageEditor loading={loading} file={image} onSave={handleSave} onClose={onClose} />
          ) : (
            <FileSelect onSelected={handleSelected} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
