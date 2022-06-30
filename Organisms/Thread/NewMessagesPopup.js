import React from 'react'
import PropTypes from 'prop-types'

import IconArrowUp from '../../Atoms/Icons/IconArrowUp'

NewMessagesPopup.propTypes = {
  /** Can change the visibility of the control*/
  visible: PropTypes.bool,

  /** Can show loading */
  loading: PropTypes.bool,

  /** Called after the button is clicked */
  onClick: PropTypes.func.isRequired,
}

NewMessagesPopup.defaultProps = {
  visible: false,
  loading: false,
}

function NewMessagesPopup({ onClick, visible, loading }) {
  const visibleClass = visible ? 'newmessages-popup-shown' : ''
  const loadingClass = loading ? 'button-spinner' : ''

  return (
    <button
      onClick={onClick}
      className={`newmessages-popup ${visibleClass} ${loadingClass}`.trim()}
      disabled={loading}
      data-testid={`button-new-messages-${visible ? 'visible' : 'hidden'}`}>
      <span className="newmessages-text">New Messages</span>
      <IconArrowUp />
    </button>
  )
}

export default NewMessagesPopup
