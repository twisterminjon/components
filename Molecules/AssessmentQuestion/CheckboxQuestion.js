import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import './CheckboxQuestion.css'

CheckboxQuestion.propTypes = {
  /** Question data */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  /** Send data change */
  onChange: PropTypes.func.isRequired,
}

function CheckboxQuestion({ data: options, onChange }) {
  const onChangeHandler = useCallback(
    (index, checkValue) => {
      const newOptions = options.map((option, i) => (i === index ? { ...option, value: !checkValue } : option))

      onChange(newOptions)
    },
    [onChange, options]
  )

  return (
    <div>
      {options.map((option, i) => (
        <CheckboxButton
          id={i}
          key={i}
          name={option.text}
          checked={Boolean(option.value)}
          onChangeHandler={() => onChangeHandler(i, option.value)}
          data-testid={`assessment-data-${i}`}
        />
      ))}
    </div>
  )
}

const CheckboxButton = ({ id, name, checked, onChangeHandler, ...rest }) => {
  return (
    <div onClick={onChangeHandler} className="assessment-checkbox">
      <input readOnly name={id} checked={checked} type="checkbox" {...rest} />
      <label htmlFor={id} className="assessment-checkbox-label">
        {name}
      </label>
    </div>
  )
}

export default CheckboxQuestion
