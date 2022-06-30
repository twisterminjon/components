import React from 'react'
import PropTypes from 'prop-types'

import EventPendingCard from '../../Molecules/EventCard/EventPendingCard'

EventsPendingList.propTypes = {
  /** Array of events to show */
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Array of loading events to show */
  loadingEvent: PropTypes.string,
  /** Function called on event click */
  onClick: PropTypes.func.isRequired,
}

EventsPendingList.defaultProps = {
  loadingEvent: null,
}

export default function EventsPendingList({ events, onClick, loadingEvent }) {
  return (
    <div className="eventspendinglist-container">
      {events.map(event => (
        <EventPendingCard event={event} key={event.id} loading={loadingEvent === event.id} onClick={onClick} />
      ))}
    </div>
  )
}
