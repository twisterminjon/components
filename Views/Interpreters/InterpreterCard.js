import React from 'react'
import PropTypes from 'prop-types'

import './Interpreters.css'

InterpreterCard.propTypes = {
  /** Can't call if interpreter disabled */
  disabled: PropTypes.bool.isRequired,
  /** Name of interpreter */
  name: PropTypes.string.isRequired,
  /** Called when card pressed */
  onClick: PropTypes.func.isRequired,
}

export default function InterpreterCard({ disabled, name, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="button-reset interpreter-card"
      data-testid={`interpreter-card-${name}`}>
      {name}
      {disabled ? ' (offline)' : ''}
    </button>
  )
}
