import React, { useCallback } from 'react'
import { range } from 'lodash-es'
import PropTypes from 'prop-types'

import './ScaleQuestion.css'

ScaleQuestion.propTypes = {
  /** Question data */
  data: PropTypes.shape({
    end: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,

  /** Send data change */
  onChange: PropTypes.func.isRequired,
}

function ScaleQuestion({ data: options, onChange }) {
  const { start: minLabel, end: maxLabel, scale, value } = options
  const values = range(0, scale + 1)

  const onChangeHandler = useCallback(
    scaleValue => {
      if (value !== scaleValue) {
        onChange({ ...options, value: scaleValue })
      }
    },
    [options, onChange, value]
  )

  return (
    <div>
      <div className="assessment-scale-min-label">
        <span data-testid="assessment-question-min-label">{minLabel}</span>
      </div>
      <div className="assessment-scale-buttons">
        {values.map((v, i) => (
          <ScaleButton
            key={i}
            number={i}
            value={value}
            group="scale"
            data-testid={`assessment-data-${i}`}
            onChangeHandler={() => onChangeHandler(i)}
          />
        ))}
      </div>
      <div className="assessment-scale-max-label">
        <span data-testid="assessment-question-max-label">{maxLabel}</span>
      </div>
    </div>
  )
}

function ScaleButton({ value, number, onChangeHandler, group, ...rest }) {
  return (
    <label>
      <input checked={value === number} onChange={onChangeHandler} type="radio" name={group} {...rest} />
      <div className="box">
        <span>{number}</span>
      </div>
    </label>
  )
}

export default ScaleQuestion
