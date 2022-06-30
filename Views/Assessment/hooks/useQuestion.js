import { useCallback } from 'react'

import { AuthUtils } from '@shared/helpers'

import { AssessmentsApi } from '@shared/services'

const useQuestion = assessmentId => {
  const getQuestion = useCallback(
    () =>
      AssessmentsApi.getQuestion(AuthUtils.getUserId(), assessmentId).catch(() =>
        Promise.reject('Failed to get question, please try again')
      ),
    [assessmentId]
  )

  const getPreviousQuestion = useCallback(
    () =>
      AssessmentsApi.getPreviousQuestion(AuthUtils.getUserId(), assessmentId).catch(() =>
        Promise.reject('Failed to get question, please try again')
      ),
    [assessmentId]
  )

  return { getQuestion, getPreviousQuestion }
}

export default useQuestion
