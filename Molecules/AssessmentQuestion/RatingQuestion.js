import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import './RatingQuestion.css'

export const Order = {
  LowestFirst: 'DESC',
  HighestFirst: 'ASC',
}

export const Type = {
  Five: 'FIVE',
  Ten: 'TEN',
}

RatingQuestion.propTypes = {
  /** Question data */
  data: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    order: PropTypes.oneOf(Object.values(Order)).isRequired,
    type: PropTypes.oneOf(Object.values(Type)).isRequired,
    value: PropTypes.number,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        followUp: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,

  /** Send data change */
  onChange: PropTypes.func.isRequired,
}

function RatingQuestion({ data, onChange }) {
  const { start, end, order, type, value, options } = data

  const values = useMemo(() => {
    const values = options.map(({ value }) => value)
    return order === Order.LowestFirst ? values : values.reverse()
  }, [options, order])

  const [topLabel, bottomLabel] = useMemo(() => {
    return order === Order.LowestFirst ? [start, end] : [end, start]
  }, [order, start, end])

  const onChangeHandler = useCallback(
    ratingValue => {
      if (value !== ratingValue) {
        onChange({ ...data, value: ratingValue })
      }
    },
    [data, value, onChange]
  )

  return (
    <div>
      <div className="assessment-rating-top-label">
        <span data-testid="assessment-question-min-label">{topLabel}</span>
      </div>
      <div className={`assessment-rating-buttons ${type === Type.Five ? 'five-type-box' : ''}`.trim()}>
        {values.map(v => (
          <RatingButton
            key={v}
            number={v}
            value={value}
            group="rating"
            data-testid={`assessment-data-${v}`}
            onChangeHandler={() => onChangeHandler(v)}
          />
        ))}
      </div>
      <div className="assessment-rating-bottom-label">
        <span data-testid="assessment-question-max-label">{bottomLabel}</span>
      </div>
    </div>
  )
}

function RatingButton({ value, number, onChangeHandler, group, ...rest }) {
  return (
    <label>
      <input checked={value === number} onChange={onChangeHandler} type="radio" name={group} {...rest} />
      <div className="box">
        <span>{number}</span>
      </div>
    </label>
  )
}

export default RatingQuestion
