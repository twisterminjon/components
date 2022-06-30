import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import useAssessment from './hooks/useAssessment'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import QuestionsContainer from './QuestionsContainer'
import { CurrentUserContext } from '@shared/providers'
function AssessmentContainer({ match }) {
  const assessmentId = match.params.assessmentId
  const currentUser = useContext(CurrentUserContext)
  const history = useHistory()
  const uiV2 = currentUser && currentUser.enterprise && currentUser.enterprise.uiV2

  if (uiV2) {
    history.replace(`/app/assessments/${assessmentId}`)
  }

  const { data: assessment, loading } = useAssessment(assessmentId)

  if (!assessment || loading) {
    return <SpinnerDots style={{ width: '100%', height: '100%' }} />
  }

  return <QuestionsContainer assessment={assessment} />
}

export default AssessmentContainer
