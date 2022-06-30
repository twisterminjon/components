import React from 'react'
import PropTypes from 'prop-types'

import EventCompletedCard from '../../Molecules/EventCard/EventCompletedCard'

EventsCompletedList.propTypes = {
  /** Array of events to show */
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function EventsCompletedList({ events }) {
  return (
    <div className="eventscompletedlist-container">
      {events.map(event => (
        <EventCompletedCard event={event} key={event.id} />
      ))}
    </div>
  )
}
