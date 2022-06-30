import React from 'react'
import PropTypes from 'prop-types'

import IconPencil from '../../Atoms/Icons/IconPencil'

import './EditButtonIcon.css'

EditButtonIcon.propTypes = {
  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

EditButtonIcon.defaultProps = {
  className: '',
  style: {},
}

export default function EditButtonIcon({ className, style }) {
  return (
    <div className={`editbuttonicon ${className}`} style={style}>
      <IconPencil size={8} color="var(--button__edit_settings_fg)" />
    </div>
  )
}
