import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-apollo'
import PatientsQl from '../../../services/PatientsQl'
import { userCanBeClickToCalled } from '@shared/helpers'
import { initiateClick2Call } from '../../Organisms/CallManager/CallManager'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import PatientHeader from './PatientHeader'
import PatientHeaderPlaceholder from './PatientHeaderPlaceholder'
import { CurrentUserContext } from '@shared/providers'
import { USER_STATUS_OFFLINE } from '../../../constants'

const GET_PATIENT_QUERY = PatientsQl.getProfileV1()

PatientHeaderContainer.propTypes = {
  /** User id for the patient */
  id: PropTypes.string.isRequired,

  /** Called after initiating a call to the patient */
  onCall: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

PatientHeaderContainer.defaultProps = {
  className: '',
  style: {},
}

export default function PatientHeaderContainer({ id, onCall, className, style, ...rest }) {
  const currentUser = useContext(CurrentUserContext)

  const { loading, error, data } = useQuery(GET_PATIENT_QUERY, {
    variables: { id },
  })

  if (loading) {
    return <PatientHeaderPlaceholder />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  const canBeDialed = userCanBeClickToCalled({
    caller: currentUser,
    userToCall: data.user,
  })

  const handleCall = () => {
    // Make sure we have patient data before trying to make a call.
    // This should never happen but is just a safe guard.
    if (data) {
      // determine if this is a click2call
      if (data.user.overallStatus === USER_STATUS_OFFLINE) {
        initiateClick2Call({
          userId: data.user.id,
          displayName: data.user.displayName,
          patientId: data.user.patient.id,
        })
        return
      }

      onCall({
        id: data.user.id,
        patientUserId: data.user.id,
        patientId: data.user.patient.id,
        displayName: data.user.displayName,
        profileImage: data.user.profileImage,
      })
    } else {
      console.error(`PatientHeaderContainer tried to start a call when no patient data was available`)
    }
  }

  const handleMessage = () => {
    rest.history.push(`/app/messages/user/${id}`)
  }

  const handleOnDemand = () => {
    const { enterpriseId, id } = rest.match.params
    rest.history.push(`/app/enterprises/${enterpriseId}/patientsV1/${id}/ondemand-message`)
  }

  return (
    <PatientHeader
      user={data.user}
      loading={loading}
      canBeDialed={canBeDialed}
      onCall={handleCall}
      onMessage={handleMessage}
      onOnDemandMessage={handleOnDemand}
      className={className}
      style={style}
    />
  )
}
