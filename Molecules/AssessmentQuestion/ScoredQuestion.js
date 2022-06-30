import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import './RadioQuestion.css'

ScoredQuestion.propTypes = {
  /** Question data */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  /** Send data change */
  onChange: PropTypes.func.isRequired,
}

function ScoredQuestion({ data: options, onChange }) {
  const selected = options.findIndex(o => o.value)

  const onChangeHandler = useCallback(
    newSelected => {
      if (selected !== newSelected) {
        onChange(options.map((o, i) => ({ ...o, value: i === newSelected })))
      }
    },
    [onChange, options, selected]
  )

  return (
    <div>
      {options.map((option, i) => (
        <RadioButton
          id={i}
          key={i}
          name={`${option.text} (${option.score})`}
          checked={i === selected}
          onChangeHandler={() => onChangeHandler(i)}
          data-testid={`assessment-data-${i}`}
        />
      ))}
    </div>
  )
}

const RadioButton = ({ id, name, checked, onChangeHandler, ...rest }) => {
  return (
    <div onClick={onChangeHandler} className="assessment-radio">
      <input readOnly name={id} checked={checked} type="radio" {...rest} />
      <label htmlFor={id} className="assessment-radio-label">
        {name}
      </label>
    </div>
  )
}

export default ScoredQuestion
