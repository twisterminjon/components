import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from 'react-avatar-editor'

import IconImage from '../../Atoms/Icons/IconImage'
import Button from '../../Atoms/Button/Button'
import Slider from '../../Atoms/Slider/Slider'
import { FILE_NOT_ALLOWED } from '../../../constants'

import './ImageEditor.css'

import debug from 'debug'
const d = debug('project:ImageEditor')

ImageEditor.propTypes = {
  /** Will show circle crop if true */
  showCircularCropping: PropTypes.bool,

  /** Can show a loader */
  loading: PropTypes.bool,

  /** A file object to edit, this matches what an input type=file returns */
  file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,

  /** Called after the save action */
  onSave: PropTypes.func.isRequired,
}

ImageEditor.defaultProps = {
  showCircularCropping: true,
}

/**
 * Display an editor for an avatar, allows choosing zoom level and position
 */
export default function ImageEditor({ loading, file, onSave, showCircularCropping }) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const picEditor = useRef(null)

  const handleZoom = e => {
    setZoomLevel(parseFloat(e.target.value))
  }

  const handleSave = () => {
    if (picEditor) {
      // This returns a HTMLCanvasElement
      const canvasScaled = picEditor.current.getImageScaledToCanvas()

      try {
        canvasScaled.toBlob(blob => {
          blob.name = picEditor.current.props.image.name
          onSave(blob)
        })
      } catch (e) {
        // We will get an error if the image is invalid or if the url of the image isn't from our domain
        d(`upload error=${e}`)

        onSave(FILE_NOT_ALLOWED)
      }
    }
  }

  return (
    <section className="imageeditor-content" data-testid="image-edit">
      <AvatarEditor
        ref={picEditor}
        image={file}
        width={375}
        height={375}
        border={0}
        borderRadius={showCircularCropping ? 187 : 0}
        color={[0, 0, 0, 0.6]} // RGBA
        scale={zoomLevel}
        rotate={0}
      />

      <div className="imageeditor-controls">
        <div className="imageeditor-zoom">
          <IconImage color="var(--base__body_fg)" size={10} />
          <Slider
            style={{ margin: '0 16px' }}
            fluid
            min={1}
            max={4}
            onChange={handleZoom}
            step={0.05}
            value={zoomLevel}
            data-testid="image-edit-zoom"
          />
          <IconImage color="var(--base__body_fg)" size={20} />
        </div>
        <Button fluid onClick={handleSave} data-testid="image-edit-save" loading={loading}>
          Save
        </Button>
      </div>
    </section>
  )
}
