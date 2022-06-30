import React from 'react'
import PropTypes from 'prop-types'

import './Slider.css'

Slider.propTypes = {
  /** Label of slider */
  label: PropTypes.string,

  /** Min value of slider */
  min: PropTypes.number.isRequired,

  /** Max value of slider */
  max: PropTypes.number.isRequired,

  /** Value of slider */
  value: PropTypes.number,

  /** Can be the width of it's parent container */
  fluid: PropTypes.bool,

  /** Called when the slider changes */
  onChange: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}
Slider.defaultProps = {
  label: null,
  fluid: false,
  className: '',
  style: {},
}

export default function Slider(props) {
  const { label, min, max, value, fluid, onChange, className, style, ...rest } = props

  const fluidClass = fluid ? 'slider--full-width' : ''

  return (
    <div className={`slider ${fluidClass} ${className}`.trim()} style={style}>
      {label && (
        <label className="slider-label" id="slider">
          {label}
        </label>
      )}
      <input
        type="range"
        className="slider-input"
        min={min}
        max={max}
        value={value}
        name="slider"
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}
