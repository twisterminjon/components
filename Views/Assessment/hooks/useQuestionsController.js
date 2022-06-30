import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import useOnAnswer from './useOnAnswer'
import useOnComplete from './useOnComplete'
import useQuestion from './useQuestion'

export const MovingStatus = {
  IDLE: 'idle',
  MOVING_FORWARD: 'moving_forward',
  MOVING_BACK: 'moving_back',
}

function mapData(data) {
  if (data.type === 'rating') {
    return { ...data, options: { value: data.options.value } }
  }
  return data
}

const useQuestionsController = assessment => {
  const assessmentId = assessment.id
  const history = useHistory()

  const [question, setQuestion] = useState()
  const [isIntro, setIsIntro] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isStarted, setIsStarted] = useState(assessment.isStarted)
  const [status, setStatus] = useState(MovingStatus.IDLE)

  const { getQuestion, getPreviousQuestion } = useQuestion(assessmentId)
  const onAnswer = useOnAnswer(assessmentId)
  const onComplete = useOnComplete(assessmentId)

  const handleStart = useCallback(() => {
    setStatus(MovingStatus.MOVING_FORWARD)
    getQuestion()
      .then(({ data }) => {
        data.id ? setQuestion(data) : setIsCompleted(true)
        setIsStarted(true)
        setIsIntro(false)
      })
      .catch(message => toast.warn(message))
      .finally(() => setStatus(MovingStatus.IDLE))
  }, [getQuestion])

  const handleComplete = useCallback(() => {
    setStatus(MovingStatus.MOVING_FORWARD)
    onComplete()
      .then(() => {
        toast.info('Thank you for completing the assessment.')
        history.replace('/app/surveys')
      })
      .catch(message => {
        setStatus(MovingStatus.IDLE)
        toast.warn(message)
      })
  }, [history, onComplete])

  const handleForward = useCallback(
    props => {
      const data = mapData(props)
      setStatus(MovingStatus.MOVING_FORWARD)
      onAnswer(data)
        .then(({ data }) => {
          if (data.id) {
            setQuestion(data)
          } else {
            setIsCompleted(true)
            setQuestion()
          }
        })
        .catch(message => toast.warn(message))
        .finally(() => setStatus(MovingStatus.IDLE))
    },
    [onAnswer]
  )

  const handleBack = useCallback(() => {
    setStatus(MovingStatus.MOVING_BACK)
    getPreviousQuestion()
      .then(({ data }) => {
        if (data.id) {
          setQuestion(data)
        } else {
          setIsIntro(true)
          setQuestion()
        }
        if (isCompleted) {
          setIsCompleted(false)
        }
      })
      .catch(message => toast.warn(message))
      .finally(() => setStatus(MovingStatus.IDLE))
  }, [getPreviousQuestion, isCompleted])

  return {
    question,
    status,
    isStarted,
    isIntro,
    isCompleted,
    startAssessment: handleStart,
    completeAssessment: handleComplete,
    moveForward: handleForward,
    moveBack: handleBack,
  }
}

export default useQuestionsController
