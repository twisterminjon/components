import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { CurrentUserContext } from '@shared/providers'
import { featureSecureMessages } from '@shared/helpers'

import { useQuery, useMutation } from 'react-apollo'
import UsersQl from '../../../services/UsersQl'

import { AssessmentsApi, AssessmentsQl } from '@shared/services'

import ErrorPage from '../ErrorPage/ErrorPage'
import PatientSurveyInterventionMessage from './PatientSurveyInterventionMessage'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

const GET_PATIENT_QUERY = UsersQl.getByIdShort()
const SEND_INTERVENTION_MESSAGE_MUTATION = AssessmentsQl.sendInterventionSecureMessage()

PatientSurveyInterventionMessageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      /** The enterprise id */
      enterpriseId: PropTypes.string.isRequired,
      /** The patient's id */
      patientId: PropTypes.string.isRequired,
      /** The survey session id */
      surveySessionId: PropTypes.string.isRequired,
      /** The answer id */
      answerId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default function PatientSurveyInterventionMessageContainer({ staticContext, match, ...rest }) {
  const { enterpriseId, patientId, surveySessionId, answerId } = match.params

  const [sendMessage, { error: sendMessageError }] = useMutation(SEND_INTERVENTION_MESSAGE_MUTATION)

  const [intervention, setIntervention] = useState(null)
  const [interventionError, setInterventionError] = useState(null)

  const fetchIntervention = useCallback(async () => {
    try {
      const surveySessionInterventions = await AssessmentsApi.getSurveyInterventionsWithSessionId(surveySessionId)

      const interventions = surveySessionInterventions.interventions

      const intervention = interventions.find(intervention => intervention.answerId === parseInt(answerId))

      return intervention
    } catch (err) {
      throw err
    }
  }, [surveySessionId, answerId])

  useEffect(() => {
    ;(async () => {
      try {
        const intervention = await fetchIntervention()

        setIntervention(intervention)
      } catch (err) {
        console.error(err)

        setInterventionError(err)
      }
    })()
  }, [fetchIntervention])

  // Query the patient
  const { data: patientData, error: patientError, loading: patientLoading } = useQuery(GET_PATIENT_QUERY, {
    variables: {
      id: patientId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const goToInterventionsPage = useCallback(() => {
    rest.history.push(`/app/enterprises/${enterpriseId}/patientsV1/${patientId}/alerts/${surveySessionId}`)
  }, [enterpriseId, patientId, rest.history, surveySessionId])

  const handleSend = useCallback(
    async text => {
      try {
        await sendMessage({
          variables: {
            answerId,
            text,
          },
        })

        // After send, return to interventions page
        goToInterventionsPage()
      } catch (err) {
        console.error(err)

        // Error handled by useMutation hook
      }
    },
    [answerId, goToInterventionsPage, sendMessage]
  )

  if (!intervention || patientLoading) {
    return <SpinnerDots style={{ width: '100%', height: '100%' }} />
  }

  if (interventionError) {
    return <ErrorPage error={interventionError} />
  }

  if (sendMessageError) {
    return <ErrorPage error={sendMessageError} />
  }

  if (patientError) {
    return <ErrorPage error={patientError} />
  }

  const { question: surveyQuestion, answer: surveyAnswer } = intervention
  const { displayName: patientName, profileImage } = patientData.user

  return (
    <CurrentUserContext.Consumer>
      {user => {
        const canMessage = featureSecureMessages(user)
        if (!canMessage) {
          goToInterventionsPage()
          return false
        }

        return (
          <PatientSurveyInterventionMessage
            patientName={patientName}
            profileImage={profileImage}
            surveyQuestion={surveyQuestion}
            surveyAnswer={surveyAnswer}
            onSend={handleSend}
            {...rest}
          />
        )
      }}
    </CurrentUserContext.Consumer>
  )
}
