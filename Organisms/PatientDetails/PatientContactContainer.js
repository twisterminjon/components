import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Query, Mutation } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'
import EnterpriseQl from '../../../services/EnterpriseQl'

import { AuthUtils } from '@shared/helpers'

import ErrorMessages from '../../../ErrorMessages.json'
import PatientContact from './PatientContact'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import './PatientDetails.css'

export default class PatientContactContainer extends Component {
  static propTypes = {
    /** A patient to display */
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string,
      emailOptOut: PropTypes.bool,
      smsOptOut: PropTypes.bool,
      patient: PropTypes.shape({
        id: PropTypes.string,
        contactType: PropTypes.string,
        language: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }).isRequired,
  }

  render() {
    const { user, ...rest } = this.props

    const ENTERPRISE_LANGAUGES = EnterpriseQl.getLanguagesLookupList(AuthUtils.getEnterpriseId())
    const PATIENT_UPDATE = PatientsQl.updateCommPreferences()

    return (
      <Query query={ENTERPRISE_LANGAUGES}>
        {({ loading, error, data }) => {
          if (loading) return null

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
            <Mutation mutation={PATIENT_UPDATE}>
              {(updatePatient, { loading, error: updatePatientError, data: updatePatientData }) => {
                // unhandled error
                if (updatePatientError) {
                  if (
                    !updatePatientError.message.includes('Network error: Failed to fetch') &&
                    !updatePatientError.message.includes(ErrorMessages.Create.INVALID_PHONE_FORMAT)
                  ) {
                    return <ErrorPage error={updatePatientError} />
                  }

                  // fetch error (api server down) AND no data
                  if (!updatePatientData && updatePatientError.message.includes('Network error: Failed to fetch')) {
                    return <ServerIssue />
                  }
                }

                return (
                  <PatientContact
                    user={user}
                    onSave={updatePatient}
                    languages={data.languages}
                    loading={loading}
                    {...rest}
                  />
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}
