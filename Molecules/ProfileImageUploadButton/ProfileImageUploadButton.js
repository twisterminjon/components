import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

import ProfileImageUploadModal from '../ProfileImageUploadModal/ProfileImageUploadModal'
import IconPencil from '../../Atoms/Icons/IconPencil'

import './ProfileImageUploadButton.css'

ProfileImageUploadButton.propTypes = {
  /** Can show a toast with options */
  showOptions: PropTypes.bool,

  /** Can show a loader */
  loading: PropTypes.bool,

  /** Can show a loader on the toasts remove button */
  loadingRemove: PropTypes.bool,

  /** Called when the chosen image changes */
  onSave: PropTypes.func.isRequired,

  /** Called after the remove action */
  onRemove: PropTypes.func.isRequired,

  /** Class for the outer component wrapper */
  className: PropTypes.string,

  /** Style for the outer component wrapper */
  style: PropTypes.object,
}

ProfileImageUploadButton.defaultProps = {
  loading: false,
  className: '',
  style: {},
}

/**
 * Display a button to select and edit an image
 */
export default function ProfileImageUploadButton({
  showOptions,
  loading,
  loadingRemove,
  onSave,
  onRemove,
  className,
  style,
}) {
  const [show, setShow] = useState(false)

  const handleToggleShowUpload = () => {
    setShow(!show)
  }

  const handleSave = file => {
    handleToggleShowUpload()
    onSave(file)
  }

  const handleRemove = () => {
    handleToggleShowUpload()
    onRemove()
  }

  const loadingClass = loading ? 'button-spinner' : ''
  return (
    <div className={`${className}`} style={style}>
      <Popup
        trigger={
          <button
            disabled={loading}
            className={`profileimageuploadbutton ${loadingClass}`.trim()}
            onClick={handleToggleShowUpload}
            data-testid="button-edit-profile-image">
            <IconPencil color="var(--brandcolor_dark)" size={16} />
          </button>
        }
        content="Edit profile pic"
        position="bottom left"
      />

      {show && (
        <ProfileImageUploadModal
          showOptions={showOptions}
          loading={false}
          loadingRemove={loadingRemove}
          onClose={handleToggleShowUpload}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      )}
    </div>
  )
}
