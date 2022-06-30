import React from 'react'
import PropTypes from 'prop-types'

import Radio from '../../Atoms/Radio/Radio'
import './RadioLabel.css'

RadioLabel.propTypes = {
  /** Radio checked if true */
  isChecked: PropTypes.bool.isRequired,

  /** Called when Radio clicked */
  onClick: PropTypes.func.isRequired,

  /** Label to render */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

  /** Style to be used on the wrapper */
  wrapperClass: PropTypes.string,
}

RadioLabel.defaultProps = {
  wrapperClass: '',
  isChecked: false,
}

export default function RadioLabel({ isChecked, onClick, children, wrapperClass }) {
  return (
    <div onClick={() => onClick(!isChecked)} className={`radiolabel-container ${wrapperClass}`.trim()}>
      <Radio onClick={onClick} isChecked={isChecked} />
      <div className="radiolabel-content">{children}</div>
    </div>
  )
}
