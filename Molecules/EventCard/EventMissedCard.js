import React from 'react'
import PropTypes from 'prop-types'

import { ProgramEventLabel, ProjectDate, DateFormat } from '@shared/helpers'
import IconTimes from '../../Atoms/Icons/IconTimes'
import EventCard from './EventCard'

import './EventMissedCard.css'

EventMissedCard.propTypes = {
  /** Event object to represent */
  event: PropTypes.shape({
    type: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  /** Function called when card clicked */
  onClick: PropTypes.func,
  /** Determines if loading is enabled */
  loading: PropTypes.bool.isRequired,
}

export default function EventMissedCard({ event, onClick, loading, ...rest }) {
  const date = event.type === 'REMOTE_MONITOR' ? event.startDate : event.date

  return (
    <EventCard
      date={ProjectDate(date).formatLocalUTC(DateFormat.L)}
      renderIcon={() => <IconTimes size={25} color="var(--program_events_missed_text)" />}
      label={ProgramEventLabel[event.type]}
      loading={loading}
      onClick={() => onClick(event)}
      textClassName="eventmissedcard-text"
      {...rest}
    />
  )
}
