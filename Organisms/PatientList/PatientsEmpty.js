import React, { Component } from 'react'

import PatientListHeader from './PatientListHeader'

import './PatientList.css'

export default class PatientsEmpty extends Component {
  render() {
    const { ...rest } = this.props

    return (
      <div className="patientlist-wrap">
        <PatientListHeader {...rest} />
      </div>
    )
  }
}
