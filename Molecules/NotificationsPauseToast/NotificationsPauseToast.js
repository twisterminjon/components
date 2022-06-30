import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Formik, Form } from 'formik'

import { DateFormat } from '@shared/helpers'

import Button from '../../Atoms/Button/Button'
import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import ModalToast from '../../Atoms/ModalToast/ModalToast'
import DateSelector from '../../Molecules/DateSelector/DateSelector'
import TimeSelector from '../../Molecules/TimeSelector/TimeSelector'

import './NotificationsPauseToast.css'

NotificationsPauseToast.propTypes = {
  /** Date when notifications should be paused */
  startDateTime: PropTypes.string,

  /** Date when notifications should be unpaused */
  endDateTime: PropTypes.string,

  /** Function called on pause */
  onPause: PropTypes.func.isRequired,

  /** Function called on cancel */
  onCancel: PropTypes.func.isRequired,

  /** The toast can be shown or hidden */
  show: PropTypes.bool.isRequired,
}

NotificationsPauseToast.defaultProps = {
  startDateTime: '',
  endDateTime: '',
  show: false,
}

const TIME_FORMAT = 'h:mm a'

export default function NotificationsPauseToast({ show, defaultStartDateTime, defaultEndDateTime, onPause, onCancel }) {
  const defaultStartMoment = defaultStartDateTime ? dayjs(defaultStartDateTime) : null
  const defaultEndMoment = defaultEndDateTime ? dayjs(defaultEndDateTime) : null

  const handlePause = ({ startMoment, endMoment }) => {
    if (typeof onPause === 'function') {
      const startDateTime = startMoment.format(DateFormat.DateTime3)
      const endDateTime = endMoment.format(DateFormat.DateTime3)
      onPause({ startDateTime, endDateTime })
    }
  }

  const [hasFromDate, setHasFromDate] = useState(false)
  const [hasFromTime, setHasFromTime] = useState(false)
  const [hasToDate, setHasToDate] = useState(false)
  const [hasToTime, setHasToTime] = useState(false)

  const handleCancel = evt => {
    evt.preventDefault()

    if (typeof onCancel === 'function') {
      onCancel(evt)
    }
  }

  const validate = ({ startMoment, endMoment }) => {
    const errors = {}

    if (!startMoment.isValid()) {
      errors.startMoment = 'Start date and time must be set'
    }

    if (!endMoment.isValid()) {
      errors.endMoment = 'End date and time must be set'
    }

    const startTimestamp = startMoment.unix()
    const endTimestamp = endMoment.unix()

    if (endTimestamp < startTimestamp) {
      errors.endMoment = 'End date and time must be greater than beginning date and time.'
    }

    return errors
  }

  return (
    <ModalToast show={show}>
      <Formik
        initialValues={{
          startMoment: defaultStartMoment,
          endMoment: defaultEndMoment,
        }}
        onSubmit={handlePause}
        validateOnBlur={true}
        validateOnChange={true}
        validate={validate}>
        {({ values, errors, setFieldValue }) => {
          const hasErrors = Object.keys(errors).length > 0

          return (
            <Form className="notificationspausetoast" data-testid="notificationspausetoast">
              <div className="notificationspausetoast-contentwrap">
                <DateAndTimeFields
                  type="from"
                  defaultMoment={values.startMoment}
                  onDateStatusChange={hasDate => setHasFromDate(hasDate)}
                  onTimeStatusChange={hasTime => setHasFromTime(hasTime)}
                  onMomentChange={startMoment => setFieldValue('startMoment', startMoment)}
                />
                {errors && errors.startMoment && <div>{errors.startMoment}</div>}

                <DateAndTimeFields
                  type="to"
                  defaultMoment={values.endMoment}
                  onDateStatusChange={hasDate => setHasToDate(hasDate)}
                  onTimeStatusChange={hasTime => setHasToTime(hasTime)}
                  onMomentChange={endMoment => setFieldValue('endMoment', endMoment)}
                />
                {errors && errors.endMoment && <div>{errors.endMoment}</div>}

                <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <ButtonGhost
                    className="notificationspausetoast-button"
                    onClick={handleCancel}
                    data-testid="notificationspausetoast-cancel-button">
                    Cancel
                  </ButtonGhost>
                  <Button
                    className="notificationspausetoast-button"
                    type="submit"
                    disabled={hasErrors || !hasFromDate || !hasFromTime || !hasToDate || !hasToTime}
                    data-testid="notificationspausetoast-pause-button">
                    Pause
                  </Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </ModalToast>
  )
}

const DateAndTimeFields = ({
  type, // "from" or "to"
  defaultMoment,
  onMomentChange,
  onDateStatusChange,
  onTimeStatusChange,
}) => {
  const [currentMoment, setCurrentMoment] = useState(defaultMoment ? defaultMoment : type === 'from' ? dayjs() : null)

  const defaultMomentIsValid = useMemo(() => (defaultMoment ? defaultMoment.isValid() : false), [defaultMoment])
  const defaultTimestamp = useMemo(() => (defaultMomentIsValid ? defaultMoment.unix() : null), [
    defaultMoment,
    defaultMomentIsValid,
  ])

  const currentMomentIsValid = currentMoment ? currentMoment.isValid() : false
  const currentTimestamp = currentMomentIsValid ? currentMoment.unix() : null

  useEffect(() => {
    if (currentMomentIsValid && currentTimestamp !== defaultTimestamp) {
      if (typeof onMomentChange === 'function') {
        onMomentChange(currentMoment)
      }
    }
  }, [currentMoment, currentMomentIsValid, currentTimestamp, defaultTimestamp, onMomentChange, type])

  const [_hasDate, _setHasDate] = useState(currentMomentIsValid)
  const [_hasTime, _setHasTime] = useState(currentMomentIsValid)

  useEffect(() => {
    onDateStatusChange(_hasDate)
    onTimeStatusChange(_hasTime)
  }, [_hasDate, _hasTime, onDateStatusChange, onTimeStatusChange])

  const setHasDate = hasDate => {
    if (_hasDate !== hasDate) {
      _setHasDate(hasDate)
      onDateStatusChange(hasDate)
    }
  }

  const setHasTime = hasTime => {
    if (_hasTime !== hasTime) {
      _setHasTime(hasTime)
      onTimeStatusChange(hasTime)
    }
  }

  const getNextCurrentMoment = (nextMomentDate, nextHours, nextMinutes) => {
    return dayjs(nextMomentDate || new Date())
      .startOf('day')
      .add(nextHours, 'hours')
      .add(nextMinutes, 'minutes')
  }

  const handleDateChange = dayjsDate => {
    if (!dayjsDate) {
      console.warn('No dayjsDate passed to handleDateChange')
      setHasDate(false)
      return
    }

    // Important, these are inherited from the currentMoment, not from the date
    // picker's dayjsDate callback
    const currentHours = currentMoment ? currentMoment.hour() : 0
    const currentMinutes = currentMoment ? currentMoment.minute() : 0

    // Retain hours & minutes, and apply to next date
    const nextCurrentMoment = getNextCurrentMoment(dayjsDate, currentHours, currentMinutes)

    setCurrentMoment(nextCurrentMoment)
    setHasDate(true)
  }

  const handleTimeChange = dayjsTime => {
    if (!dayjsTime) {
      console.warn('No dayjsTime passed to handleTimeChange')
      setHasTime(false)
      return
    }

    const nextHours = dayjsTime.hour()
    const nextMinutes = dayjsTime.minute()

    // Retain day and modify hours & minutes
    const nextCurrentMoment = getNextCurrentMoment(currentMoment, nextHours, nextMinutes)

    setCurrentMoment(nextCurrentMoment)
    setHasTime(true)
  }

  return (
    <div>
      <div className="notificationspausetoast-title">{type === 'from' ? 'From' : 'To'}</div>

      <div className="notificationspausetoast-fieldwrap">
        <div>
          <label className="notificationspausetoast-label">Date</label>
          <DateSelector
            defaultValue={currentMomentIsValid ? currentMoment : null}
            placeholder="Enter date"
            onChange={handleDateChange}
            anchorDirection="right"
            appendToBody={true}
          />
        </div>

        <div>
          <label className="notificationspausetoast-label">Time</label>
          <TimeSelector
            defaultValue={currentMomentIsValid ? currentMoment : null}
            showSecond={false}
            onChange={handleTimeChange}
            format={TIME_FORMAT}
            use12Hours
            placeholder="Enter time"
          />
        </div>
      </div>
    </div>
  )
}
