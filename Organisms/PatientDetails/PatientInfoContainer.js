import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'

import PatientInfo from './PatientInfo'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import './PatientDetails.css'

export default class PatientInfoContainer extends Component {
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
      }),
    }).isRequired,
    /** Called to send an invite to a patient */
    onSendInvite: PropTypes.func.isRequired,
    /** True if the sendInvite is in flight */
    sendInviteLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { user, sendInviteLoading, onSendInvite, ...rest } = this.props

    const PATIENT_UPDATE = PatientsQl.updateInfo()

    return (
      <Mutation mutation={PATIENT_UPDATE}>
        {(updatePatient, { loading, error, data }) => {
          // unhandled error
          if (error) {
            if (!error.message.includes('Network error: Failed to fetch')) {
              return <ErrorPage error={error} />
            }

            // fetch error (api server down) AND no data
            if (!data && error.message.includes('Network error: Failed to fetch')) {
              return <ServerIssue />
            }
          }

          return (
            <PatientInfo
              user={user}
              onSave={updatePatient}
              loading={loading}
              onSendInvite={onSendInvite}
              sendInviteLoading={sendInviteLoading}
              {...rest}
            />
          )
        }}
      </Mutation>
    )
  }
}
