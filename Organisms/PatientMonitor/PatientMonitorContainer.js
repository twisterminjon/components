import React, { useCallback, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useQuery, useMutation } from '@apollo/react-hooks'

import PatientsQl from '../../../services/PatientsQl'
import { CurrentUserContext } from '@shared/providers'
import { featurePatientMonitoring } from '@shared/helpers'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import PatientMonitor from './PatientMonitor'
import PatientHeader from '../../Organisms/PatientDetails/PatientHeaderContainer'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import { RequestVital } from '../../Molecules/ModalRequestReadingToast/ModalRequestReadingToast'

const VITALS_QUERY = PatientsQl.getVitals()
const CREATE_VITAL_REQUEST_MUTATION = PatientsQl.createVitalsReadingRequest()

export default function PatientMonitorContainer({ onStartPatientCall, ...rest }) {
  const currentUser = useContext(CurrentUserContext)
  const patientUserId = rest.match.params.id

  const [createVitalRequest, { loading: creatingVitalRequest }] = useMutation(CREATE_VITAL_REQUEST_MUTATION)
  const { loading, error, data, refetch } = useQuery(VITALS_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: patientUserId },
  })

  const handleRequest = useCallback(
    type => {
      return createVitalRequest({ variables: { type, userId: patientUserId } })
        .then(() => toast.info(`${RequestVital[type]} Reading Request Sent`))
        .catch(() => toast.error(`Oops, there was problem requesting the reading. Would you like try again?`))
    },
    [createVitalRequest, patientUserId]
  )

  useEffect(() => {
    refetch()
  }, [currentUser.preferredUnitSystem, refetch])

  if (error) return <ErrorPage error={error} />

  const handleClose = () => {
    const enterpriseId = rest.match.params.enterpriseId

    rest.history.push(`/app/enterprises/${enterpriseId}/patientsV1/${patientUserId}`)
  }

  return (
    <div className="patientmonitor-wrap">
      <PatientHeader id={patientUserId} onCall={onStartPatientCall} {...rest} />
      {loading ? (
        <SpinnerDots className="patientmonitor-loader" />
      ) : (
        <PatientMonitor
          loading={loading}
          requesting={creatingVitalRequest}
          featureAllowed={featurePatientMonitoring(data.user)}
          readings={data.user.vitalsReadings}
          units={currentUser.preferredUnitSystem}
          onClose={handleClose}
          onRequest={handleRequest}
        />
      )}
    </div>
  )
}
