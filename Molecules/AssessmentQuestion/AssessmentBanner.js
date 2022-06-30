import React from 'react'
import PropTypes from 'prop-types'

import IconsReminder from '../../Atoms/IconsReminder/IconsReminder'

import './AssessmentBanner.css'

AssessmentBanner.propTypes = {
  /** Assessment title */
  title: PropTypes.string.isRequired,
}

export default function AssessmentBanner({ title }) {
  return (
    <div className="assessment-banner">
      <div className="assessment-banner-icon">
        <IconsReminder name="survey" />
      </div>
      <h4 className="assessment-banner-title" data-testid="assessment-banner-title">
        {title}
      </h4>
    </div>
  )
}
