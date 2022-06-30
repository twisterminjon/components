import React, { useEffect, useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'

import ModalToast from '../../Atoms/ModalToast/ModalToast'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import Button from '../../Atoms/Button/Button'
import DateInput from '../../Molecules/DateInput/DateInput'
import InputLabel from '../../Atoms/InputLabel/InputLabel'
import TimeAmPmInput from '../../Molecules/TimeAmPmInput/TimeAmPmInput'
import './EventActionToast.css'

EventActionToast.propTypes = {
  /** The model can be shown or hidden */
  show: PropTypes.bool.isRequired,
  /** The reschedule block can be shown or hidden */
  isReschedulable: PropTypes.bool.isRequired,
  /** Date of the event */
  date: PropTypes.string,
  /** Function called when complete is called */
  onComplete: PropTypes.func.isRequired,
  /** Function called when save is called */
  onSave: PropTypes.func.isRequired,
  /** Function called when cancel is called */
  onCancel: PropTypes.func.isRequired,
  /** User timezone who is reviewing */
  timezone: PropTypes.string.isRequired,
}

export default function EventActionToast({ show, isReschedulable, date, onComplete, onSave, onCancel, timezone }) {
  const [newDate, setNewDate] = useState()
  const [newTime, setNewTime] = useState()
  const newISODate = useMemo(() => `${newDate}T${newTime}`, [newDate, newTime])

  useEffect(() => {
    if (date && show) {
      setNewDate(ProjectDate(date).formatLocal())
      setNewTime(ProjectDate(date).formatLocal(DateFormat.AMPM))
    }
  }, [date, show])

  const handleSave = useCallback(() => {
    const { date, time } = ProjectDate(newISODate, DateFormat.DateTime1).getDateTimeWithTZ(timezone)
    onSave({ startDate: date, startTime: time })
  }, [newISODate, onSave, timezone])

  const isDisabled = !newDate || !newTime
  const ButtonComponent = isReschedulable ? ButtonGhost : Button

  return (
    <ModalToast show={show}>
      <div className="eventactiontoast-container">
        <div>
          <span className="eventactiontoast-title">What would you like to do ?</span>
        </div>
        <div className="eventactiontoast-content">
          <ButtonComponent fluid onClick={onComplete} data-testid="button-mark-complete">
            Mark Complete
          </ButtonComponent>
          {isReschedulable ? (
            <>
              <div className="eventactiontoast-datecontainer">
                <InputLabel label="Reschedule" htmlFor="reschedule-date" id="reschedule-date-label" />
                <DateInput
                  value={newDate}
                  minDate={new Date()}
                  name="reschedule-date"
                  onChange={date => setNewDate(date ? ProjectDate(date).formatLocal() : undefined)}
                />
              </div>
              <div className="eventactiontoast-datecontainer">
                <TimeAmPmInput
                  name="reschedule-time"
                  value={newTime}
                  timeFormat="AMPM"
                  onChange={(e, data) => setNewTime(data.value)}
                />
              </div>
              <div className="eventactiontoast-actions">
                <div className="eventactiontoast-buttonwrapper">
                  <ButtonGhost fluid onClick={onCancel} data-testid="button-cancel" style={{ height: '100%' }}>
                    Cancel
                  </ButtonGhost>
                </div>
                <div className="eventactiontoast-buttonwrapper eventactiontoast-save">
                  <Button fluid onClick={handleSave} disabled={isDisabled} data-testid="button-save">
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="eventactiontoast-cancel">
              <ButtonGhost fluid onClick={onCancel} data-testid="button-cancel">
                Cancel
              </ButtonGhost>
            </div>
          )}
        </div>
      </div>
    </ModalToast>
  )
}
