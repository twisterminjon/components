import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import { useSyncQuery, EVT_CARE_TEAMS_CHANGED } from '@shared/hooks'
import PatientsQl from '../../../services/PatientsQl'
import EnterpriseQl from '../../../services/EnterpriseQl'

import PatientCareTeams from './PatientCareTeams'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import './PatientDetails.css'

PatientCareTeamsContainer.propTypes = {
  /** A patient to display */
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    patient: PropTypes.shape({
      id: PropTypes.string,
      contactType: PropTypes.string,
      language: PropTypes.shape({
        name: PropTypes.string,
      }),
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
}

const ENTERPRISE_CARETEAM_QUERY = EnterpriseQl.getCareTeamsLookup()
const PATIENT_UPDATE_MUTATION = PatientsQl.updateCareTeam()

export default function PatientCareTeamsContainer({ user, ...rest }) {
  const { loading, error, data } = useSyncQuery(ENTERPRISE_CARETEAM_QUERY, {
    variables: { id: user.enterprise.id },
    fetchPolicy: 'network-only',
    syncEventNames: [EVT_CARE_TEAMS_CHANGED],
  })

  const [updatePatient, { error: updatePatientError, data: updatePatientData }] = useMutation(PATIENT_UPDATE_MUTATION)

  const handleSave = useCallback(
    values => {
      const roleIds = values.map(item => ({ id: item.id }))
      const roles = { connect: roleIds }
      const variables = { userId: user.id, roles: roles }

      updatePatient({ variables })
    },
    [updatePatient, user.id]
  )

  if (!data && loading) return null

  if (error) {
    // unhandled error
    if (!error.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={error} />
    }

    // fetch error (api server down) AND no data
    if (!data && error.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  if (updatePatientError) {
    // unhandled error
    if (!updatePatientError.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={updatePatientError} />
    }

    // fetch error (api server down) AND no data
    if (!updatePatientData && updatePatientError.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  const careTeams = data.enterprise.roles || []

  return <PatientCareTeams user={user} onSave={handleSave} careTeamsLookup={careTeams} {...rest} />
}
