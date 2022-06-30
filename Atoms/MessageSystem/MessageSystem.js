/** Display a system message in a thread of messages.
 *  System messages are special messages that the system will provide to add
 *  additional information to the context of a change in messages.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './MessageSystem.css'

MessageSystem.propTypes = {
  /** Text for the message */
  text: PropTypes.string.isRequired,

  /** The type of system message to display */
  type: PropTypes.string,
}

const MessageSystemType = {
  DEFAULT: 'default',
  BRIGHT: 'bright',
  ACCENT: 'accent',
  RIGHT: 'right',
}

const mapTypeToClasses = {
  [MessageSystemType.DEFAULT]: 'messagesystem-bubble',
  [MessageSystemType.RIGHT]: 'messagesystem-right',
  [MessageSystemType.BRIGHT]: 'messagesystem-left-bubble messagesystem-bubble--bright',
  [MessageSystemType.ACCENT]: 'messagesystem-left-bubble messagesystem-bubble--accent',
}

const resolveMessageSystemType = type => {
  switch (type) {
    case 'USER_ADDED':
    case 'GROUP_CREATED':
    case 'GROUP_RENAMED':
    case 'INTERVENTION_STARTED':
    case 'INTERVENTION_RESOLVE':
    case 'USER_REMOVED':
      return MessageSystemType.BRIGHT
    case 'INTERVENTION_COMPLETE':
      return MessageSystemType.ACCENT
    case 'UNREAD_LINE':
      return MessageSystemType.RIGHT
    default:
      return MessageSystemType.DEFAULT
  }
}

export default function MessageSystem({ text, type, className = '', style = {} }) {
  const messageSystemType = resolveMessageSystemType(type)
  const typeClass = mapTypeToClasses[messageSystemType]

  return (
    <div className={`messagesystem ${className}`.trim()} style={style} data-testid="system-message-user-added">
      <div className={`messagesystem-common ${typeClass}`.trim()}>
        <span className="messagesystem-message">{text}</span>
      </div>
    </div>
  )
}
