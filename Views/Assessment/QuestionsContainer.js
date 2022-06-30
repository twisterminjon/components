import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import useQuestionsController, { MovingStatus } from './hooks/useQuestionsController'
import AssessmentQuestion from './AssessmentQuestion'
import AssessmentIntro from './AssessmentIntro'
import AssessmentCompleted from './AssessmentCompleted'

QuestionsContainer.propTypes = {
  /** Assessment Data */
  assessment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isStarted: PropTypes.bool.isRequired,
    completeByDate: PropTypes.string.isRequired,
    estimatedTimeToComplete: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
}

function QuestionsContainer({ assessment }) {
  const history = useHistory()

  const {
    status: stepperStatus,
    question,
    isIntro,
    isStarted,
    isCompleted,
    startAssessment,
    completeAssessment,
    moveBack,
    moveForward,
  } = useQuestionsController(assessment)

  const status = useMemo(
    () => ({
      // eslint-disable-line arrow-body-style
      loadingForward: stepperStatus === MovingStatus.MOVING_FORWARD,
      loadingBack: stepperStatus === MovingStatus.MOVING_BACK,
    }),
    [stepperStatus]
  )

  if (isIntro) {
    return (
      <AssessmentIntro
        completeBy={assessment.completeByDate}
        description={assessment.description}
        estimate={assessment.estimatedTimeToComplete}
        title={assessment.title}
        isStarted={isStarted}
        onCancel={() => history.goBack()}
        onStart={startAssessment}
        loading={status.loadingForward}
      />
    )
  }

  if (isCompleted) {
    return (
      <AssessmentCompleted title={assessment.title} onBack={moveBack} onComplete={completeAssessment} status={status} />
    )
  }

  return (
    <AssessmentQuestion
      title={assessment.title}
      onNext={moveForward}
      onPrevious={moveBack}
      question={question}
      status={status}
    />
  )
}

export default QuestionsContainer
