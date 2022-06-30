import React, { Component } from 'react'

import './PatientHeader.css'
import './PatientDetails.css'

export default class PatientDetailsPlaceholder extends Component {
  render() {
    return (
      <div className="patientdetails-wrap">
        <div className="patientheader patientheader-ph">
          <div className="patientheader-ph-avatar" />
          <div className="patientheader-label-wrap">
            <div className="patientheader-ph-text-1" />
            <div className="patientheader-ph-text-2" />
          </div>
        </div>
      </div>
    )
  }
}
