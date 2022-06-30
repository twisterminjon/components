import React, { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import DateInput from '../DateInput/DateInput'
import './DateSelector.css'

DateSelector.propTypes = {
  /** Default date value, as string or dayjs.js object */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(dayjs)]),
  /** Called after date has been changed */
  onChange: PropTypes.func.isRequired,
  /** Placeholder text for input field */
  placeholder: PropTypes.string,
  /** Number of months to limit selection to */
  numberOfMonths: PropTypes.number,
}

DateSelector.defaultProps = {
  defaultValue: '',
  anchorDirection: 'right',
  appendToBody: true,
  numberOfMonths: 1,
  placeholder: 'Enter date',
}

export default function DateSelector({
  anchorDirection,
  appendToBody,
  defaultValue,
  format,
  numberOfMonths,
  onChange,
  placeholder,
  ...rest
}) {
  const dateType = typeof defaultValue
  const [currentMoment, setCurrentMoment] = useState(
    dateType === 'string'
      ? defaultValue.trim()
        ? dayjs(defaultValue, ['MM/DD/YYYY', 'YYYY/MM/DD'])
        : null
      : defaultValue
  )

  const handleDateChange = newDate => {
    if (!newDate) {
      onChange(null)
      return
    }
    const newDay = dayjs(newDate)

    setCurrentMoment(newDay)

    onChange(newDay)
  }

  const domId = useMemo(() => `singledatepicker-${Math.random() * 999999999}`, [])
  const { minDate, maxDate } = useMemo(() => {
    const minDate = dayjs()
    return {
      minDate: minDate.toDate(),
      maxDate: minDate.add(Math.max(numberOfMonths, 1), 'month').toDate(),
    }
  }, [numberOfMonths])

  return (
    <div className="dateselector">
      <DateInput
        name={domId}
        value={currentMoment && currentMoment.isValid() ? currentMoment.toDate() : null}
        onChange={handleDateChange}
        placeholder={placeholder}
        isClearable={false}
        minDate={minDate}
        maxDate={maxDate}
        {...rest}
      />
    </div>
  )
}
