import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import SurveyQuestion from '../../Atoms/SurveyQuestion/SurveyQuestion'

import ListHeader from '../../Molecules/ListHeader/ListHeader'

import './PatientSurveyIntervention.css'

const NO_REMAINING_MESSAGE = 'No remaining interventions.'

PatientSurveyIntervention.propTypes = {
  /** The patient's name */
  patientName: PropTypes.string.isRequired,
  /** URL of patient's profile image */
  profileImage: PropTypes.string.isRequired,
  /** Format: "MM-DD-YYYY" */
  assignedOn: PropTypes.string.isRequired,
  /** A list of intervention data */
  interventions: PropTypes.arrayOf(
    PropTypes.shape({
      /** The question text */
      question: PropTypes.string.isRequired,
      /** The answer text */
      answer: PropTypes.string.isRequired,
      /** The answer id */
      answerId: PropTypes.number.isRequired,
    })
  ),
  /** Called after user wishes to resolve intervention */
  onResolve: PropTypes.func.isRequired,
  /** Called after user wishes to send message */
  onSendMessage: PropTypes.func.isRequired,
  /** If true, sendMessage buttons are hidden */
  canMessage: PropTypes.bool,
}

PatientSurveyIntervention.defaultProps = {
  interventions: [],
  canMessage: false,
}

export default function PatientSurveyIntervention({
  patientName,
  profileImage,
  assignedOn,
  interventions,
  onResolve,
  onSendMessage,
  canMessage,
  ...rest
}) {
  return (
    <div className="patientsurveyintervention-wrap" {...rest}>
      <div className="patientsurveyintervention">
        <div className="patientsurveyintervention-header">
          <Avatar
            className="patientsurveyintervention-patientavatar"
            data-testid="patientsurveyintervention-patientavatar"
            imgUrl={profileImage}
          />{' '}
          <span className="patientsurveyintervention-patientname" data-testid="patientsurveyintervention-patientname">
            {patientName}
          </span>
          <div className="patientsurveyintervention-title">Intervention Required</div>
          <div>
            <span>Assessment Date:</span>
            <span className="patientsurveyintervention-date" data-testid="patientsurveyintervention-date">
              {assignedOn}
            </span>
          </div>
        </div>

        <Interventions
          interventions={interventions}
          onResolve={onResolve}
          onSendMessage={onSendMessage}
          canMessage={canMessage}
        />
      </div>
    </div>
  )
}

const Interventions = ({ interventions, onResolve, onSendMessage, canMessage }) => {
  const totalInterventions = interventions.length

  const Intervention = ({ children, questionText }) => (
    <div data-testid={`patientsurveyintervention-intervention${questionText ? `-${questionText}` : ''}`}>
      {children}
    </div>
  )

  if (!totalInterventions) {
    return (
      <Intervention>
        <div className="patientsurveyintervention-noremaining" data-testid="patientsurveyintervention-noremaining">
          {NO_REMAINING_MESSAGE}
        </div>
      </Intervention>
    )
  } else {
    return interventions.map(intervention => {
      const { answer: answerText, answerId, question: questionText, answeredOn } = intervention

      return (
        <Intervention key={answerId} questionText={questionText}>
          <ListHeader label="Question">
            <SurveyQuestion
              questionText={questionText}
              answerText={answerText}
              answeredOn={answeredOn}
              onResolve={() => onResolve(answerId)}
              onSendMessage={() => onSendMessage(answerId)}
              canMessage={canMessage}
            />
          </ListHeader>
        </Intervention>
      )
    })
  }
}
