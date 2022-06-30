import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import { featureRequiredPatientProvider } from '@shared/helpers'
import PatientsQl from '../../../services/PatientsQl'

import ErrorMessages from '../../../ErrorMessages.json'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'
import PatientTeam from './PatientTeam'

import './PatientDetails.css'

PatientTeamContainer.propTypes = {
  /** A patient to display */
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    patient: PropTypes.shape({
      id: PropTypes.string,
      pcpName: PropTypes.string,
      careManagerName: PropTypes.string,
      careManagerPhone: PropTypes.string,
    }),
  }).isRequired,
}

export default function PatientTeamContainer({ user, ...rest }) {
  const PATIENT_UPDATE = PatientsQl.updateTeamPreferences()
  const [updatePatient, { loading, error: updatePatientError, data: updatePatientData }] = useMutation(PATIENT_UPDATE)

  const required = useMemo(() => featureRequiredPatientProvider(user), [user])

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

  return <PatientTeam required={required} user={user} onSave={updatePatient} loading={loading} {...rest} />
}
