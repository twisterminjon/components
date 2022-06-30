import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import Button from '../../Atoms/Button/Button'
import ImageUploadModal from '../ImageUploadModal/ImageUploadModal'

import './PhotoQuestion.css'

PhotoQuestion.propTypes = {
  /** Question data */
  data: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.string,
    url: PropTypes.string,
  }),

  /** Send photo change */
  onChange: PropTypes.func.isRequired,
}

function PhotoQuestion({ data: options, onChange }) {
  const [attachment, setAttachment] = useState(options.attachment)
  const [showUpload, setShowUpload] = useState(false)

  const handleUpload = useCallback(
    attachment => {
      setAttachment({ thumbnail: URL.createObjectURL(attachment) })
      onChange({ attachment })
      setShowUpload(false)
    },
    [onChange]
  )

  return (
    <div className="assessment-photo-answer">
      {attachment && (
        <img
          alt="temperature reading"
          src={attachment.thumbnail}
          onError={e => (e.target.style.height = '48px')}
          className="assessment-photo-answer-attachment"
        />
      )}
      <Button onClick={() => setShowUpload(true)}>{attachment ? 'Replace File' : 'Select File'}</Button>
      {showUpload && (
        <ImageUploadModal
          onSave={handleUpload}
          onClose={() => setShowUpload(false)}
          title={attachment ? 'Replace File' : 'Select File'}
        />
      )}
    </div>
  )
}

export default PhotoQuestion
