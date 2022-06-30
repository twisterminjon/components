import React, { Component } from 'react'

import UserCardSimplePlaceholder from '../../Molecules/UserCardSimple/UserCardSimplePlaceholder'
import PatientListHeader from './PatientListHeader'

import './PatientList.css'

export default class PatientListPlaceholder extends Component {
  render() {
    const { ...props } = this.props

    return (
      <div className={`patientlist-wrap `} style={this.props.style}>
        <PatientListHeader {...props} />
        <div className="patientlist-list">
          <UserCardSimplePlaceholder className="patientlist-ph-card" />
        </div>
      </div>
    )
  }
}
