import React, { useState, useCallback, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import ErrorPage from '../../Views/ErrorPage/ErrorPage'
import ProgramsQl from '../../../services/ProgramsQl'
import ProgramEvents from './ProgramEvents'
import { getEventsV1 as getEvents } from '../../../Helpers/EventHelper'
import { getPollInterval } from '../../../config'
import EnterpriseQl from '../../../services/EnterpriseQl'

const QUERY_GET_PROGRAM_EVENTS = ProgramsQl.getPatientProgramEventsV1()
const QUERY_GET_MY_TIMEZONE = EnterpriseQl.getMyEnterpriseTimezone()
const MUTATION_MARK_COMPLETE = ProgramsQl.markPatientProgramEventAsComplete()
const MUTATION_RESCHEDULE = ProgramsQl.rescheduleEvent()

export default function ProgramEventsContainer({ ...props }) {
  const patientId = props.match.params.patientId
  const programId = props.match.params.programId
  const enrollmentId = props.match.params.enrollmentId

  const [error, setError] = useState()

  const { data: tzData, error: tzError } = useQuery(QUERY_GET_MY_TIMEZONE)
  const { data: programData, error: programError } = useQuery(QUERY_GET_PROGRAM_EVENTS, {
    fetchPolicy: 'cache-and-network',
    pollInterval: getPollInterval(),
    variables: { patientId, programId, enrollmentId },
  })

  const useCompleteEventMutation = () => {
    const [completeEvent] = useMutation(MUTATION_MARK_COMPLETE)
    return useCallback(
      patientProgramEventId =>
        completeEvent({
          variables: { patientProgramEventId },
        }).catch(e => {
          setError(e)
        }),
      [completeEvent]
    )
  }
  const handleCompleteEvent = useCompleteEventMutation()

  const [rescheduleEvent] = useMutation(MUTATION_RESCHEDULE)

  const events = useMemo(() => {
    const enrollment = programData ? programData.user.patient.enrollments[0] : null

    return getEvents(enrollment)
  }, [programData])

  if (programError || tzError) {
    return <ErrorPage error={programError || tzError} />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  if (programData && tzData) {
    return (
      <ProgramEvents
        events={events}
        onReschedule={(eventId, startDate, startTime) => {
          return rescheduleEvent({
            variables: { eventId, startDate, startTime },
          }).catch(e => {
            setError(e)
          })
        }}
        onMarkComplete={handleCompleteEvent}
        timezone={tzData.me.enterprise.timezone.isoName}
      />
    )
  } else {
    return null
  }
}
