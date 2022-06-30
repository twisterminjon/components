import React from 'react'
import PropTypes from 'prop-types'

import ModalToast from '../../Atoms/ModalToast/ModalToast'
import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import Stack from '../../Atoms/Stack/Stack'

import './ImageToast.css'

ImageToast.propTypes = {
  /** Can show a loader on the remove button */
  loadingRemove: PropTypes.bool,

  /** Can be shown or hidden */
  show: PropTypes.bool.isRequired,

  /** Called after the select image action */
  onSelectImage: PropTypes.func.isRequired,

  /** Called after ImageToast item has been selected */
  onRemoveImage: PropTypes.func.isRequired,

  /** Called after ImageToast item has been selected */
  onClose: PropTypes.func.isRequired,
}
ImageToast.defaultProps = {
  loadingRemove: false,
}

export default function ImageToast({ loadingRemove, show, onSelectImage, onRemoveImage, onClose }) {
  return (
    <ModalToast show={show}>
      <Stack className="imagetoast" gap={32}>
        <Button fluid onClick={onSelectImage} data-testid="image-toast-choose">
          Choose photo
        </Button>
        <Button
          fluid
          onClick={onRemoveImage}
          data-testid="image-toast-remove"
          loading={loadingRemove}
          disabled={loadingRemove}>
          Remove photo
        </Button>
        <ButtonGhost fluid onClick={onClose} data-testid="image-toast-close">
          Close
        </ButtonGhost>
      </Stack>
    </ModalToast>
  )
}
