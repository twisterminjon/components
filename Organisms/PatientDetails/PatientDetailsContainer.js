import React from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import { useQuery, useMutation } from 'react-apollo'

import { useSyncQuery, EVT_CARE_TEAMS_CHANGED } from '@shared/hooks'
import PatientsQl from '../../../services/PatientsQl'
import AuthQl from '../../../services/AuthQl'
import UsersQl from '../../../services/UsersQl'

import PatientDetails from './PatientDetails'
import PatientHeaderPlaceholder from './PatientHeaderPlaceholder'
import PatientDetailsEmpty from './PatientDetailsEmpty'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ServerIssue from '../../Views/ServerIssue/ServerIssueContainer'

import debug from 'debug'
const d = debug('project:PatientDetailsContainer')

PatientDetailsContainer.propTypes = {
  /** Called after the patient call is clicked */
  onStartPatientCall: PropTypes.func.isRequired,
  /** Called after the caregiver call is clicked */
  onStartCaregiverCall: PropTypes.func.isRequired,
}

const PATIENT_QUERY = PatientsQl.getByIdV1()
const SEND_INVITE_MUTATION = AuthQl.sendInvite()
const USER_ACTIVE_STATUS_QUERY = UsersQl.getUserActiveStatus()

export default function PatientDetailsContainer({ patients, onStartPatientCall, onStartCaregiverCall, ...rest }) {
  const { id: userId } = rest.match.params

  // FIXME: The BE needs to be updated to allow us to specify isActive in query for user
  //
  // FIXME (possible resolution; jh): PATIENT_QUERY & USER_ACTIVE_STATUS_QUERY can probably
  // be combined into single query after socket events are implemented for remote users

  // Get patient data
  const { loading, error, data } = useSyncQuery(PATIENT_QUERY, {
    variables: { id: userId },
    fetchPolicy: 'network-only',
    syncEventNames: [EVT_CARE_TEAMS_CHANGED],
  })

  // Get patient disabled status
  const { data: activeStatusData, error: activeStatusError } = useQuery(USER_ACTIVE_STATUS_QUERY, {
    variables: { id: userId },
    fetchPolicy: 'cache-and-network',
  })

  // Send Invite
  const [sendInvite, { loading: sendInviteLoading, error: sendInviteError, data: inviteData }] = useMutation(
    SEND_INVITE_MUTATION,
    {
      onCompleted: () => {
        handleInviteSent(user.displayName)
      },
    }
  )

  if (loading) return <PatientHeaderPlaceholder />

  // fetch patient error handling
  if (error) {
    // Handle no user found
    if (error.message.includes('No User with value')) {
      d(`user not found with id=${userId}`)
      return <PatientDetailsEmpty showNotFound={true} />
    }

    // unhandled error
    if (!error.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={error} />
    }

    // fetch error (api server down) AND no data
    if (!data && error.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  if (activeStatusError) {
    return <ErrorPage error={activeStatusError} />
  }

  // Send invite error handling
  if (sendInviteError) {
    if (!sendInviteError.message.includes('Network error: Failed to fetch')) {
      return <ErrorPage error={sendInviteError} />
    }

    // fetch error (api server down) AND no data
    if (!inviteData && sendInviteError.message.includes('Network error: Failed to fetch')) {
      return <ServerIssue />
    }
  }

  let user = []
  user = data && data.user

  // Once the be is updated the following can be changed to
  // if (!user) {
  //   d(`user is disabled`)
  //   return <PatientDetailsEmpty showNotFound={true} />
  // }
  // This is catch bookmarked urls or manually typed urls for patients
  // whose user account is disabled (isActive === false)
  if (activeStatusData && activeStatusData.user && !activeStatusData.user.isActive) {
    d(`user is disabled`)
    return <PatientDetailsEmpty showNotFound={true} />
  }

  //-------------------------------------------------------------------------
  // The patient query is based on the user ID and pulled from the url.
  // This would only happen when manually typing in the url
  // So we may get a user back who is not a patient. Id works but they are
  // not a patient (e.g. could be a staff member).
  // It should rarely happen but we need to handle anyways.
  //-------------------------------------------------------------------------
  // check everything in case we have bad data
  if (user.hasOwnProperty('isPatient') && !user.isPatient) {
    return <PatientDetailsEmpty showNotFound={true} />
  }

  const handleInviteSent = patientName => {
    toast.success(`Invite was sent to ${patientName}`, {
      hideProgressBar: true,
    })
  }

  return (
    <PatientDetails
      user={user}
      onStartPatientCall={onStartPatientCall}
      onStartCaregiverCall={onStartCaregiverCall}
      onSendInvite={() => {
        sendInvite({ variables: { id: user.patient.id } })
      }}
      sendInviteLoading={sendInviteLoading}
      {...rest}
    />
  )
}
