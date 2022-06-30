import React, { useState, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ProgramsQl from '../../../services/ProgramsQl'
import PatientsQl from '../../../services/PatientsQl'
import ProgramInfo from './ProgramInfo'

const getProgram = enrollment => {
  if (enrollment) {
    return {
      id: enrollment.program.id,
      name: enrollment.program.name,
      enrollmentId: enrollment.id,
      enrollDate: enrollment.enrollDate,
    }
  }
  return {}
}

export default function ProgramInfoContainer({ ...props }) {
  const patientId = props.match.params.patientId
  const programId = props.match.params.programId
  const enrollmentId = props.match.params.enrollmentId

  const [error, setError] = useState()

  const [removeProgram] = useMutation(PatientsQl.disenrollPatient())
  const {
    data: programData,
    // loading: programLoading,
    // error: programError,
  } = useQuery(ProgramsQl.getPatientProgramEventsV1(), {
    fetchPolicy: 'cache-and-network',
    pollInterval: 5000,
    variables: { patientId, programId, enrollmentId },
  })

  const handleRemoveProgram = useCallback(
    () =>
      removeProgram({ variables: { enrollmentId } })
        .then(() => {
          props.history.goBack()
        })
        .catch(e => {
          setError(e)
        }),
    [enrollmentId, props.history, removeProgram]
  )

  if (error) {
    return <ErrorPage error={error} />
  }

  if (programData) {
    const program = getProgram(programData.user.patient.enrollments[0])
    return <ProgramInfo user={programData.user} program={program} onDisenroll={handleRemoveProgram} />
  }
  return null
}
