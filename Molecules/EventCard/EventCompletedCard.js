import React from 'react'
import PropTypes from 'prop-types'

import { ProgramEventLabel, ProjectDate, DateFormat } from '@shared/helpers'

import EventCard from './EventCard'
import IconCheckSmall from '../../Atoms/Icons/IconCheckSmall'

import './EventCompletedCard.css'

EventCompletedCard.propTypes = {
  /** Event object to represent */
  event: PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
}

export default function EventCompletedCard({ event }) {
  return (
    <EventCard
      label={ProgramEventLabel[event.type]}
      date={ProjectDate(event.date).formatLocalUTC(DateFormat.L)}
      renderIcon={() => <IconCheckSmall size={25} color="var(--program_events_completed_text)" />}
      wrapperClassName="eventcompletedcard-wrapper"
      textClassName="eventcompletedcard-text"
    />
  )
}
