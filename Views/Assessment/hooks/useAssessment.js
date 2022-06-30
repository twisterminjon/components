import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AssessmentsApi } from '@shared/services'
import ErrorMessages from '../../../../ErrorMessages.json'
import { apiErrorGetResponseData, apiErrorToString, AuthUtils } from '@shared/helpers'

import debug from 'debug'
const d = debug('project:useAssessment')

/**
 * Get a specific assessment assigned to the logged in user
 */
function useAssessment(assessmentSessionId) {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()

  const getAssessment = useCallback(
    surveySessionId => {
      setLoading(true)
      AssessmentsApi.getUserAssessmentById(AuthUtils.getUserId(), surveySessionId)
        .then(({ data }) => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          if (apiErrorGetResponseData(err).includes(ErrorMessages.ASSESSMENT_NOT_ASSIGNED)) {
            d(`handled error: assessment was not assigned to this user`)
            toast.info("We couldn't find that assessment")
          } else if (apiErrorGetResponseData(err).includes(ErrorMessages.ASSESSMENT_COMPLETED)) {
            d(`handled error: assessment was completed by this user`)
            toast.info('You have already completed the assessment')
          } else {
            // unhandled errors
            // we don't know whats wrong so just go back to surveys page
            d(`Unhandled error: redirecting to surveys page`)
            d(apiErrorToString(err))
          }

          history.push('/app/surveys')
        })
    },
    [history]
  )

  useEffect(() => {
    getAssessment(assessmentSessionId)
  }, [getAssessment, assessmentSessionId])

  return { data, loading, fetch: getAssessment }
}

export default useAssessment
