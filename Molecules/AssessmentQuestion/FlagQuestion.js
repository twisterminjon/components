import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import './FlagQuestion.css'

FlagQuestion.propTypes = {
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

function FlagQuestion({ data: options, onChange }) {
  const selected = options.find(o => o.value)

  const onChangeHandler = useCallback(
    text => {
      onChange(options.map(o => ({ ...o, value: text === o.text })))
    },
    [onChange, options]
  )

  return (
    <div className="assessment-flag">
      {options.map((option, i) => {
        const stateClass = selected && option.text === selected.text ? 'active' : 'inactive'
        return (
          <button
            key={i}
            onClick={() => onChangeHandler(option.text)}
            className={`assessment-flag--${stateClass} ${i === 0 ? 'assessment-flag--first' : ''} ${
              i === options.length - 1 ? 'assessment-flag--last' : ''
            }`.trim()}
            data-testid={`assessment-data-${i}`}>
            {option.text}
          </button>
        )
      })}
    </div>
  )
}

export default FlagQuestion
