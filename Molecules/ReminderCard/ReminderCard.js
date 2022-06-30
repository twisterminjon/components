import React from 'react'
import PropTypes from 'prop-types'

import IconsReminder from '../../Atoms/IconsReminder/IconsReminder'
import Linkify from '../../Atoms/Linkify/Linkify'

import './ReminderCard.css'

ReminderCard.propTypes = {
  /** The type of reminder to show */
  type: PropTypes.oneOf(['visit', 'careteam', 'message', 'survey']).isRequired,

  /** What to show in the age for the card */
  age: PropTypes.string.isRequired,

  /** A message to show for 'message' type reminders */
  message: PropTypes.string,

  /** The user can start the call */
  patientMayInitiate: PropTypes.bool,

  /** A reminder card can show a flag for it's current state */
  flag: PropTypes.oneOf(['none', 'warn', 'expired']),

  /** Called after the reminder is clicked/tapped */
  onOpen: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,

  /** Status the survey */
  status: PropTypes.bool,
}

ReminderCard.defaultProps = {
  message: null,
  staffToMeetId: null,
  groupToMeetId: null,
  patientMayInitiate: true,
  className: '',
  style: {},
}

export default function ReminderCard({ age, type, flag, patientMayInitiate, onOpen, className, style, customMessage }) {
  const isLinkable = type === 'survey'
  const titles = {
    visit: 'Virtual Visit',
    careteam: 'Care Team',
    message: 'Message',
    survey: 'Assessment',
  }
  const title = titles[type]

  const messages = {
    visit: 'You have a Virtual Visit scheduled.',
    careteam: 'Please contact your Care Team',
    message: 'You have a new message',
    survey: 'You have a new survey',
  }
  let messageText = customMessage || messages[type]
  // FIXME: We should be getting a message from the API to show here.
  // NOTE: The message should be converted to a snippet from a parent and passed to this.
  // messageText = message || message !== '' ? message : messageText

  // Handle whether this can be opened by the user
  let onOpenOverride = onOpen
  let buttonInteractiveClass = 'remindercard--interactive'
  if (type === 'visit' || type === 'careteam') {
    if (patientMayInitiate) {
      onOpenOverride = onOpen
    } else {
      onOpenOverride = () => {}
      buttonInteractiveClass = ''
    }
  }

  const flagType = flag !== 'none' ? `remindercard-flag--${flag}` : ''

  return (
    <button
      onClick={onOpenOverride}
      className={`remindercard-button ${className}`.trim()}
      style={style}
      data-testid={`reminder-card-${type}`}
      disabled={!patientMayInitiate}>
      <div className={`remindercard-flag ${flagType}`.trim()} />
      <div className={`remindercard-container  ${buttonInteractiveClass}`}>
        <div className="remindercard-banner">
          <IconsReminder name={type} className="remindercard-icon" />
          <p style={{ color: 'white' }}>{title}</p>
          <p className="remindercard-time">{age}</p>
        </div>
        <div className="remindercard-content">
          <p>{isLinkable ? <Linkify disabled text={messageText} /> : messageText}</p>
        </div>
      </div>
    </button>
  )
}
