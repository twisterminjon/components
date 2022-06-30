import React from 'react'
import PropTypes from 'prop-types'
import './EditProgramButton.css'
import IconPencil from '../Icons/IconPencil'

// FIXME: Replace w/ ButtonIconSmall
export default function EditProgramButton({ onClick, disabled, className, ...rest }) {
  return (
    <button className={`editprogrambutton-button ${className}`} onClick={onClick} disabled={disabled} {...rest}>
      <IconPencil
        size={14}
        color={disabled ? 'var(--edit_icon_disabled_fg)' : 'var(--white)'}
        style={{ display: 'block' }}
      />
    </button>
  )
}

EditProgramButton.propTypes = {
  /** Function called when the button is clicked */
  onClick: PropTypes.func,
  /** If true, will show in a disabled this.state. */
  disabled: PropTypes.bool,
  /** ClassName for the wrapper */
  className: PropTypes.string,
}

EditProgramButton.defaultProps = {
  disabled: false,
  className: '',
}
