import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconAnswerCall from '../../Atoms/Icons/IconAnswerCall'
import './GroupFooter.css'

GroupFooter.propTypes = {
  /** Function called when the group name / back button is clicked */
  onClick: PropTypes.func,

  /** Call button can be disabled */
  disabled: PropTypes.bool,
}

GroupFooter.defaultProps = {
  disabled: false,
  onClick: () => {},
}

export default function GroupFooter({ onClick, disabled }) {
  const [mouseDown, setMouseDown] = useState(false)

  const handleMouseDown = () => {
    if (!disabled) setMouseDown(true)
  }

  const handleMouseUp = () => {
    setMouseDown(false)
  }

  const buttonClickClass = mouseDown ? 'callbutton-down' : ''

  return (
    <div className="groupfooter-container">
      <button
        className={`groupfooter-button ${buttonClickClass}`}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        data-testid="button-users-availability">
        <IconAnswerCall style={{ transform: 'scale(0.5)' }} />
        <span className="groupfooter-button-label">{disabled ? 'None Available' : 'Call First Available'}</span>
      </button>
    </div>
  )
}
