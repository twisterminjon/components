import { useCallback } from 'react'

import { AuthUtils } from '@shared/helpers'

import { AssessmentsApi } from '@shared/services'

const useOnComplete = assessmentSessionId => {
  return useCallback(
    () =>
      AssessmentsApi.completeSurvey({
        userId: AuthUtils.getUserId(),
        surveySessionId: assessmentSessionId,
      }).catch(() => Promise.reject('Failed to complete the assessment, please try again')),
    [assessmentSessionId]
  )
}

export default useOnComplete
