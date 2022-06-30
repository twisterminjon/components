import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'

import './ModalToast.css'

export default function ModalToastButton({
  isGhostButton = false,
  buttonLabel = 'Close',
  onClick = () => {},
  className = '',
  ...rest
}) {
  const testId = rest['data-testid'] ? rest['data-testid'] : `modaltoastbutton-${buttonLabel}`

  if (isGhostButton)
    return (
      <ButtonGhost
        className={`modaltoastbutton ${className}`.trim()}
        onClick={onClick}
        data-testid={testId}
        autoFocus={true}
        {...rest}>
        {buttonLabel}
      </ButtonGhost>
    )

  return (
    <Button
      className={`modaltoastbutton ${className}`.trim()}
      onClick={onClick}
      data-testid={testId}
      autoFocus={true}
      {...rest}>
      {buttonLabel}
    </Button>
  )
}

ModalToastButton.propTypes = {
  /** If set then it will render a ghost button, if not a regular button */
  isGhostButton: PropTypes.bool,
  /** Label for the Button */
  buttonLabel: PropTypes.string,
  /** Function to be called on click */
  onClick: PropTypes.func,
}
