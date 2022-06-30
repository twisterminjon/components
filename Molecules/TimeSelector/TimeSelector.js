import React, { useState } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import IconCloseX from '../../Atoms/Icons/IconCloseX'

import TimePicker from 'time-picker-date-fns'
import 'time-picker-date-fns/assets/index.css'

import './TimeSelector.css'

TimeSelector.propTypes = {
  /** Default time value, as string or dayjs.js object */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(dayjs)]),
  /** Time format */
  format: PropTypes.string,
  /** Called after time has been changed */
  onChange: PropTypes.func.isRequired,
  /** Placeholder text for input field */
  placeholder: PropTypes.string,
  /** Whether or not to show seconds in time picker */
  showSecond: PropTypes.bool,
  /** Whether or not to use 12 hours (or 24 hours) */
  use12Hours: PropTypes.bool,
}

TimeSelector.defaultProps = {
  defaultValue: '',
  format: 'h:mm a',
  placeholder: 'Enter time',
  showSecond: false,
  use12Hours: true,
}

export default function TimeSelector({ defaultValue, format, onChange, placeholder, showSecond, use12Hours, ...rest }) {
  const timeType = typeof defaultValue
  const [currentMoment, setCurrentMoment] = useState(
    timeType === 'string'
      ? defaultValue.trim()
        ? dayjs(defaultValue, ['h:m a', 'H:m']) // We just need the time parsed
        : null
      : defaultValue
  )

  const handleTimeChange = newDate => {
    if (!newDate) {
      onChange(null)
      return
    }

    const newDayjs = dayjs(newDate)
    setCurrentMoment(newDayjs)

    const callbackTime = timeType === 'string' ? newDayjs.format(format) : newDayjs

    onChange(callbackTime)
  }

  return (
    <div className="timeselector">
      <TimePicker
        defaultValue={currentMoment && currentMoment.isValid() ? currentMoment.toDate() : null}
        defaultOpenValue={currentMoment && currentMoment.isValid() ? currentMoment.toDate() : new Date()}
        format={format}
        inputReadOnly
        onChange={handleTimeChange}
        placeholder={placeholder}
        showSecond={showSecond}
        use12Hours={use12Hours}
        clearIcon={
          <span className="timeselector--clear-icon">
            <IconCloseX size={12} />
          </span>
        }
        {...rest}
      />
    </div>
  )
}
