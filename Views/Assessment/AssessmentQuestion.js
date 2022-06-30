import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import AssessmentBanner from '../../Molecules/AssessmentQuestion/AssessmentBanner'
import AssessmentButtons from '../../Molecules/AssessmentQuestion/AssessmentButtons'
import RadioQuestion from '../../Molecules/AssessmentQuestion/RadioQuestion'
import FlagQuestion from '../../Molecules/AssessmentQuestion/FlagQuestion'
import CheckboxQuestion from '../../Molecules/AssessmentQuestion/CheckboxQuestion'
import TextQuestion from '../../Molecules/AssessmentQuestion/TextQuestion'
import PhotoQuestion from '../../Molecules/AssessmentQuestion/PhotoQuestion'
import ScaleQuestion from '../../Molecules/AssessmentQuestion/ScaleQuestion'
import RatingQuestion from '../../Molecules/AssessmentQuestion/RatingQuestion'
import ScoredQuestion from '../../Molecules/AssessmentQuestion/ScoredQuestion'
import Linkify from '../../Atoms/Linkify/Linkify'

import './AssessmentQuestion.css'

AssessmentQuestion.propTypes = {
  /** Assessment title */
  title: PropTypes.string.isRequired,

  /** Current question */
  question: PropTypes.object.isRequired,

  /** Execute on `Go back` */
  onPrevious: PropTypes.func.isRequired,

  /** Execute on `Next` */
  onNext: PropTypes.func.isRequired,

  /** Loadings status */
  status: PropTypes.shape({
    loadingForward: PropTypes.bool.isRequired,
    loadingBack: PropTypes.bool.isRequired,
  }).isRequired,
}

const typeToQuestionComponent = {
  radio: RadioQuestion,
  flag: FlagQuestion,
  check: CheckboxQuestion,
  text: TextQuestion,
  photo: PhotoQuestion,
  scale: ScaleQuestion,
  rating: RatingQuestion,
  scored: ScoredQuestion,
}

const checkQuestionIsValid = ({ options, type, required = true }) => {
  if (!required) {
    return true
  }
  if (!options) {
    return false
  }
  switch (type) {
    case 'flag':
    case 'radio':
    case 'check':
    case 'scored':
      return options ? options.some(({ value }) => Boolean(value)) : false
    case 'text':
      return options ? options.value.trim() !== '' : false
    case 'scale':
      return options ? options.value !== '' : false
    case 'rating':
      return options ? options.value !== undefined : false
    case 'photo':
      return options ? Boolean(options.attachment) : false
    default:
      return true
  }
}

function AssessmentQuestion({ title, question, onPrevious, onNext, status }) {
  const viewRef = useRef()
  const [currentOptions, setCurrentOptions] = useState({
    options: question.options,
    type: question.type,
    required: question.required,
  })

  const isQuestionValid = useMemo(() => checkQuestionIsValid(currentOptions), [currentOptions])

  useEffect(() => {
    viewRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [question])

  useEffect(() => {
    setCurrentOptions({
      options: question.options,
      type: question.type,
      required: question.required,
    })
  }, [question])

  const handleChange = useCallback(
    newOptions =>
      setCurrentOptions({
        options: newOptions,
        type: question.type,
        required: question.required,
      }),
    [question]
  )

  const handleNext = useCallback(
    () =>
      onNext({
        id: question.id,
        type: question.type,
        options: currentOptions.options,
      }),
    [onNext, question, currentOptions]
  )

  const QuestionComponent = typeToQuestionComponent[currentOptions.type]

  return (
    <div ref={viewRef} className="assessment-wrap" data-testid={`assessment-${title}`}>
      <div className="assessment-column">
        <AssessmentBanner title={title} />
        <QuestionWrapper id={question.id} text={question.text}>
          <QuestionComponent key={question.id} data={currentOptions.options} onChange={handleChange} />
        </QuestionWrapper>
        <AssessmentButtons status={status} onPrevious={onPrevious} onNext={handleNext} allowNext={isQuestionValid} />
      </div>
    </div>
  )
}

const QuestionWrapper = ({ id, text, children }) => {
  return (
    <Question key={id} id={id}>
      <QuestionText text={text} />
      <Answers>{children}</Answers>
    </Question>
  )
}

const Question = ({ id, children }) => {
  return (
    <div className="assessment-question-wrap" data-testid={`assessment-question-${id}`}>
      {children}
    </div>
  )
}

const QuestionText = ({ text }) => {
  return (
    <p className="assessment-question">
      <Linkify text={text} />
    </p>
  )
}

const Answers = ({ children }) => {
  return <div className="assessments-answers-wrap">{children}</div>
}

export default AssessmentQuestion
