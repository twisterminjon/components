import React from 'react'
import PropTypes from 'prop-types'

import './RadioInput.css'

// FIXME: This component is a redo of the Radio and RadioLabel components and should replace them.
// This uses an input instead of a bunch of divs. Also need to fix the focus/keyboard behaviour
RadioInput.propTypes = {
  /** Css name for the property */
  name: PropTypes.string.isRequired,

  /** The radio can show a simple label or another react component */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element]),

  /** Radio checked if true */
  checked: PropTypes.bool,

  /** The inputs value */
  value: PropTypes.string.isRequired,

  /** Can be full width */
  fluid: PropTypes.bool,

  /** Called when value changes */
  onChange: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

RadioInput.defaultProps = {
  label: '',
  checked: false,
  fluid: false,
  className: '',
  style: {},
}

export default function RadioInput({ name, label, checked, value, fluid, onChange, className, style }) {
  const fluidClass = fluid ? 'radioinput--full-width' : ''

  return (
    <label className={`radioinput ${fluidClass} ${className}`.trim()} style={style}>
      {label}
      <input type="radio" checked={checked} name={name} onChange={onChange} value={value} />
      <span className="radioinput-check-mark" />
    </label>
  )
}
