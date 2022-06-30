import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { featureAllowCodes, featurePatientMonitoring } from '@shared/helpers'

import PatientInfoContainer from './PatientInfoContainer'
import PatientHeaderContainer from './PatientHeaderContainer'
import PatientContactContainer from './PatientContactContainer'
import PatientTeamContainer from './PatientTeamContainer'
import PatientProgramsContainer from './PatientProgramsContainer'
import PatientCareTeamsContainer from './PatientCareTeamsContainer'
import PatientCaregiversContainer from './PatientCaregiversContainer'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import PatientSurveyContainer from './PatientSurveyContainer'
import PatientAccessCodeContainer from './PatientAccessCodeContainer'
import AccordionTab from '../../Atoms/AccordionTab/AccordionTab'
import PatientExportMsgContainer from './PatientExportMsgContainer'

import './PatientDetails.css'

export default class PatientDetails extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      profileImage: PropTypes.string,
      patient: PropTypes.shape({
        id: PropTypes.string,
        identifier: PropTypes.string,
        dateOfBirth: PropTypes.string,
        ssnLast4: PropTypes.string,
        zipCode: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
        pcpName: PropTypes.string,
        careManagerName: PropTypes.string,
        careManagerPhone: PropTypes.string,
      }),
    }),
    /** Called after a patient call button is clicked */
    onStartPatientCall: PropTypes.func.isRequired,
    /** Function called when a patient is called */
    onStartCaregiverCall: PropTypes.func.isRequired,
    /** Called to send an invite to a patient */
    onSendInvite: PropTypes.func.isRequired,
    /** True if the sendInvite is in flight */
    sendInviteLoading: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props)

    this.handleCaregiverCall = this.handleCaregiverCall.bind(this)
    this.handleGoToMonitor = this.handleGoToMonitor.bind(this)
  }

  handleCaregiverCall(id, displayName, profileImage) {
    this.props.onStartCaregiverCall({
      id,
      displayName,
      profileImage,
      relatedUser: this.props.user.id,
      relatedId: this.props.user.id,
    })
  }

  handleGoToMonitor() {
    this.props.history.push(`${this.props.location.pathname}/monitor`)
  }

  render() {
    const { user, sendInviteLoading, onStartPatientCall, onSendInvite, ...rest } = this.props

    return (
      <div className="patientdetails-wrap" data-testid="patient-details">
        <DocTitle title="Patient" />

        <PatientHeaderContainer id={user.id} onCall={onStartPatientCall} {...rest} />

        <div className="patientdetails-display-wrap">
          {featurePatientMonitoring(user) && (
            <AccordionTab
              label="Monitoring"
              onActivate={this.handleGoToMonitor}
              direction="right"
              inverted
              style={{ marginBottom: 32 }}
            />
          )}
          {/* ************************************* */}
          {/* LOGIN KEY */}
          {/* ************************************* */}
          {featureAllowCodes(user) && <PatientAccessCodeContainer user={user} />}

          {/* ************************************* */}
          {/* INFO */}
          {/* ************************************* */}
          <PatientInfoContainer
            user={user}
            onSendInvite={onSendInvite}
            sendInviteLoading={sendInviteLoading}
            {...rest}
          />

          {/* ************************************* */}
          {/* TEAM                                  */}
          {/* ************************************* */}
          <PatientTeamContainer user={user} />

          {/* ************************************* */}
          {/* CONTACT                               */}
          {/* ************************************* */}
          <PatientContactContainer user={user} />

          {/* ************************************* */}
          {/* Programs                              */}
          {/* ************************************* */}
          <PatientProgramsContainer user={user} {...rest} />

          {/* ************************************* */}
          {/* Care Team                             */}
          {/* ************************************* */}
          <PatientCareTeamsContainer user={user} />

          {/* ************************************* */}
          {/* Survey                            */}
          {/* ************************************* */}
          <PatientSurveyContainer user={user} {...rest} />

          {/* ************************************* */}
          {/* Caregivers                            */}
          {/* ************************************* */}
          <PatientCaregiversContainer user={user} onCall={this.handleCaregiverCall} {...rest} />
          {/* ************************************* */}
          {/* Export conversation of patient        */}
          {/* ************************************* */}
          <PatientExportMsgContainer userId={user.id} />
        </div>
      </div>
    )
  }
}
