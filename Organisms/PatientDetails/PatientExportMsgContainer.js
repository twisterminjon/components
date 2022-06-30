import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from 'react-apollo'

import MessagesQl from '../../../services/MessagesQl'
import PatientExportMsg from './PatientExportMsg'
import ErrorPage from '../../Views/ErrorPage/ErrorPage'

import './PatientDetails.css'

PatientExportMsgContainer.propTypes = {
  /** User id of the patient */
  userId: PropTypes.string.isRequired,
}

export default function PatientExportMsgContainer({ userId }) {
  const PATIENT_THREADS_PDF_QUERY = MessagesQl.getPatientThreadsPDF()
  const [generated, setGenerated] = useState(false)

  const [getPatientThreadsPDF, { loading, data, error }] = useLazyQuery(PATIENT_THREADS_PDF_QUERY, {
    fetchPolicy: 'network-only',
  })

  if (error) return <ErrorPage error={error} />

  return (
    <PatientExportMsg
      getPatientThreadsPDF={getPatientThreadsPDF}
      dataPDF={data && data.secureMessageThreadsWithPatient}
      userId={userId}
      loadingPDF={loading}
      generated={generated}
      handleGeneration={() => setGenerated(true)}
    />
  )
}
