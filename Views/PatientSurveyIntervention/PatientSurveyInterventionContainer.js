import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'
import { featureSecureMessages } from '@shared/helpers'

import { useQuery, useMutation } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'

import { AssessmentsApi, AssessmentsQl } from '@shared/services'

import ErrorPage from '../ErrorPage/ErrorPage'
import PatientSurveyIntervention from './PatientSurveyIntervention'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

const GET_PATIENT_QUERY = UsersQl.getByIdShort()
const RESOLVE_INTERVENTION_MUTATION = AssessmentsQl.markInterventionResolved()

PatientSurveyInterventionContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      /** The patient's id */
      patientId: PropTypes.string.isRequired,
      /** The survey session id */
      surveySessionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default function PatientSurveyInterventionContainer({ ...rest }) {
  const { surveySessionId, patientId } = rest.match.params

  // Contains questions and answers related to each intervention
  const [surveySessionInterventions, setSurveySessionInterventions] = useState({})

  // Any network errors
  const [interventionsError, setInterventionsError] = useState(null)

  // Mutation to handle resolved interventions
  const [resolveIntervention, { error: resolveInterventionError }] = useMutation(RESOLVE_INTERVENTION_MUTATION)

  /**
   * @return {SurveySessionInterventions}
   */
  const fetchSurveySessionInterventions = useCallback(async () => {
    const surveySessionInterventions = await AssessmentsApi.getSurveyInterventionsWithSessionId(surveySessionId)

    setSurveySessionInterventions(surveySessionInterventions)

    return surveySessionInterventions
  }, [surveySessionId])

  // Load interventions for this survey session
  useEffect(() => {
    ;(async () => {
      try {
        fetchSurveySessionInterventions()
      } catch (err) {
        console.error(err)

        setInterventionsError(err)
      }
    })()
  }, [fetchSurveySessionInterventions])

  /**
   * Called after user wishes to resolve the intervention with the given answer id.
   *
   * @param {number} answerId
   */
  const handleResolve = useCallback(
    async answerId => {
      try {
        await resolveIntervention({
          variables: {
            answerId,
          },
        })

        await fetchSurveySessionInterventions()
      } catch (err) {
        console.error(err)

        setInterventionsError(err)
      }
    },
    [fetchSurveySessionInterventions, resolveIntervention]
  )

  /**
   * Called after user wishes to initialize a message thread based on the
   * intervention answer id.
   *
   * @param {number} answerId
   */
  const handleInitSendMessage = useCallback(
    answerId => {
      const { enterpriseId, patientId, surveySessionId } = rest.match.params

      rest.history.push(
        `/app/enterprises/${enterpriseId}/patientsV1/${patientId}/alerts/${surveySessionId}/answers/${answerId}/send`
      )
    },
    [rest.history, rest.match]
  )

  // Query the patient
  const { data: patientData, error: patientError, loading: patientLoading } = useQuery(GET_PATIENT_QUERY, {
    variables: {
      id: patientId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const loading = patientLoading || !surveySessionInterventions || !surveySessionInterventions.assignedOn

  if (loading) {
    return <SpinnerDots style={{ width: '100%', height: '100%' }} />
  }

  if (interventionsError) {
    return <ErrorPage error={interventionsError} />
  }

  if (resolveInterventionError) {
    return <ErrorPage error={resolveInterventionError} />
  }

  if (patientError) {
    return <ErrorPage error={patientError} />
  }

  const { assignedOn, interventions } = surveySessionInterventions
  const { displayName: patientName, profileImage } = patientData.user

  return (
    <CurrentUserContext.Consumer>
      {user => {
        const canMessage = featureSecureMessages(user)

        return (
          <PatientSurveyIntervention
            patientName={patientName}
            profileImage={profileImage}
            assignedOn={assignedOn}
            interventions={interventions}
            onResolve={handleResolve}
            onSendMessage={handleInitSendMessage}
            canMessage={canMessage}
          />
        )
      }}
    </CurrentUserContext.Consumer>
  )
}
