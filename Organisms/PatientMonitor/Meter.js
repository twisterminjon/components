import React from 'react'
import PropTypes from 'prop-types'

import './PatientMonitor.css'

Meter.propTypes = {
  /** Will accent if true */
  isIntervention: PropTypes.bool.isRequired,

  /** Value for the meter */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /** A label for the meter */
  label: PropTypes.string.isRequired,
}

export default function Meter({ isIntervention, value, label }) {
  const alarmClass = isIntervention ? 'meter--alarm' : ''
  return (
    <div className={`meter ${alarmClass}`.trim()}>
      <span data-testid={`meter-${label}-value`}>{value}</span>
      <span data-testid={`meter-${label}-label`}>{label}</span>
    </div>
  )
}
