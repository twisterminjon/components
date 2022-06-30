import React from 'react'
import PropTypes from 'prop-types'

import './Radio.css'

Radio.propTypes = {
  /** Checked if true */
  isChecked: PropTypes.bool.isRequired,

  /** Called when clicked */
  onClick: PropTypes.func,
}

Radio.defaultProps = {
  isChecked: false,
  onClick: () => undefined,
}

export default function Radio({ isChecked, onClick }) {
  return (
    <div onClick={() => onClick(!isChecked)} className="radio-container">
      <div className="radio-content">{isChecked && <div className="radio-checked" />}</div>
    </div>
  )
}
