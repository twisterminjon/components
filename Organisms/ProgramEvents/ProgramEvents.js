import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProgramEventStatus, ProjectDate } from '@shared/helpers'

import ListHeader from '../../Molecules/ListHeader/ListHeader'
import EventsMissedList from '../../Molecules/EventsList/EventsMissedList'
import EventsCompletedList from '../../Molecules/EventsList/EventsCompletedList'
import EventsPendingList from '../../Molecules/EventsList/EventsPendingList'
import EventActionToast from '../../Molecules/EventActionToast/EventActionToast'
import ModalToast from '../../Atoms/ModalToast/ModalToast'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import './ProgramEvents.css'

ProgramEvents.propTypes = {
  /** Array of events to show */
  events: PropTypes.shape({
    missed: PropTypes.arrayOf(PropTypes.object),
    completed: PropTypes.arrayOf(PropTypes.object),
    pending: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  /** Function called when save is called */
  onReschedule: PropTypes.func.isRequired,
  /** Function called when complete is called */
  onMarkComplete: PropTypes.func.isRequired,
  /** User timezone who is reviewing */
  timezone: PropTypes.string.isRequired,
}

export default function ProgramEvents({ events, onReschedule, onMarkComplete, timezone }) {
  const [selectedEvent, setSelectedEvent] = useState({})
  const [loadingEvent, setLoadingEvent] = useState()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [error, setError] = useState('')

  const handleOpen = event => {
    setSelectedEvent(event)
    if (event.type === 'REMOTE_MONITOR') setShowInfoModal(true)
    else setShowEditModal(true)
  }

  const handleClose = () => {
    setShowEditModal(false)
    setShowInfoModal(false)
  }

  const handleSave = ({ startDate, startTime }) => {
    const event = selectedEvent
    setLoadingEvent(selectedEvent.id)
    handleClose()

    onReschedule(event.id, startDate, startTime)
      .then(response => {
        setLoadingEvent(null)
      })
      .catch(e => {
        setError(e)
        setLoadingEvent(null)
      })
  }

  const handleComplete = () => {
    const event = selectedEvent

    setLoadingEvent(selectedEvent.id)
    handleClose()
    onMarkComplete(event.id)
      .then(response => {
        setLoadingEvent(null)
      })
      .catch(e => {
        setLoadingEvent(null)
        setError(e)
      })
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <div className="programevents-container">
      {events.missed && (
        <ListHeader label="Missed" data-testid="events-missed">
          <EventsMissedList events={events.missed} loadingEvent={loadingEvent} onClick={handleOpen} />
        </ListHeader>
      )}
      {events.pending && (
        <ListHeader label="Next" data-testid="events-pending">
          <EventsPendingList events={events.pending} loadingEvent={loadingEvent} onClick={handleOpen} />
        </ListHeader>
      )}
      {events.completed && (
        <ListHeader label="Completed" data-testid="events-completed">
          <EventsCompletedList events={events.completed} />
        </ListHeader>
      )}
      <EventActionToast
        date={selectedEvent.startDate}
        isReschedulable={selectedEvent.status !== ProgramEventStatus.EXPIRED}
        onCancel={handleClose}
        onComplete={handleComplete}
        onSave={handleSave}
        show={showEditModal}
        timezone={timezone}
      />
      <ModalToast show={showInfoModal}>
        <div className="modalrmp">
          <ModalToast.Header
            title="Sorry... Remote Monitor Events can't be rescheduled"
            style={{ marginBottom: 100 }}
          />
          <ModalToast.Text>
            <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>Scheduled for{'  '}</span>
            {selectedEvent.startDate && ProjectDate(selectedEvent.startDate).formatLocal(DateFormat.LLL)}
          </ModalToast.Text>
          <ModalToast.Button fluid onClick={handleClose} />
        </div>
      </ModalToast>
    </div>
  )
}
