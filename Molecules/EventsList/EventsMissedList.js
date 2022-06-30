import React from 'react'
import PropTypes from 'prop-types'

import EventMissedCard from '../../Molecules/EventCard/EventMissedCard'

EventsMissedList.propTypes = {
  /** Array of events to show */
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Array of loading events to show */
  loadingEvent: PropTypes.string,
  /** Function called on event click */
  onClick: PropTypes.func.isRequired,
}

EventsMissedList.defaultProps = {
  loadingEvent: null,
}

export default function EventsMissedList({ events, onClick, loadingEvent, ...rest }) {
  return (
    <div className="eventsmissedlist-container" {...rest}>
      {events.map(event => (
        <EventMissedCard
          event={event}
          key={event.id}
          loading={loadingEvent === event.id}
          onClick={onClick}
          data-testid={`eventmissedlist-${event.type}`}
        />
      ))}
    </div>
  )
}
