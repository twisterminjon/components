import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import IconAnswerCall from '../../Atoms/Icons/IconAnswerCall'
import { USER_STATUS_LIST, USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_OFFLINE } from '../../../constants'
import { getTestId } from '@shared/helpers'
import { CurrentUserContext } from '@shared/providers'

import './DialButton.css'

DialButton.propTypes = {
  /** Adjusts the color based on a users status */
  status: PropTypes.oneOf(USER_STATUS_LIST),
  /** Function called when the button is clicked */
  onClick: PropTypes.func.isRequired,
  /** If true, will display in a dimmed state */
  dimmed: PropTypes.bool,
  /** ClassName for the wrapper */
  className: PropTypes.string,
  /** Style for the wrapper */
  style: PropTypes.object,
}

export default function DialButton({
  onClick,
  status = USER_STATUS_AVAILABLE,
  dimmed = false,
  className = '',
  style = {},
  ...rest
}) {
  const currentUser = useContext(CurrentUserContext)

  let disabled = status === USER_STATUS_BUSY || status === USER_STATUS_OFFLINE
  if (!disabled) disabled = !currentUser.micCamAvailable

  const disabledClass = disabled ? 'dialbutton--disabled' : 'dialbutton--enabled'
  const dataTestId = getTestId(rest, 'button-start-call')

  return (
    <button
      aria-label="dial"
      disabled={disabled}
      className={`dialbutton ${disabledClass} ${dimmed ? 'dialbutton--dimmed' : ''} ${className}`.trim()}
      style={style}
      onClick={onClick}
      data-testid={dataTestId}>
      <IconAnswerCall
        style={{ transform: 'scale(0.7)' }}
        color={disabled ? 'var(--statusbubble_offline)' : 'var(--black)'}
      />
    </button>
  )
}
