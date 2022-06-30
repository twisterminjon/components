import React from 'react'
import PropTypes from 'prop-types'

import IconSquareOpenSmall from '../../Atoms/Icons/IconSquareOpenSmall'
import { ProgramEventLabel, ProjectDate, DateFormat } from '@shared/helpers'

import EventCard from './EventCard'

EventPendingCard.propTypes = {
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

export default function EventPendingCard({ event, onClick, loading }) {
  return (
    <EventCard
      label={ProgramEventLabel[event.type]}
      date={ProjectDate(event.startDate).formatLocalUTC(DateFormat.L)}
      renderIcon={() => <IconSquareOpenSmall size={25} color="var(--white)" />}
      loading={loading}
      onClick={() => onClick(event)}
    />
  )
}
