import React from 'react'
import PropTypes from 'prop-types'

import ButtonGhost from '../../Atoms/ButtonGhost/ButtonGhost'
import Button from '../../Atoms/Button/Button'
import IconFlag from '../../Atoms/Icons/IconFlag'

import './SurveyQuestion.css'

SurveyQuestion.propTypes = {
  /** The survey question */
  questionText: PropTypes.string.isRequired,
  /** The survey response */
  answerText: PropTypes.string.isRequired,
  /** When the survey was answered */
  answeredOn: PropTypes.string.isRequired,
  /** Called after user wishes to resolve intervention */
  onResolve: PropTypes.func.isRequired,
  /** Called after user wishes to send a message regarding this intervention */
  onSendMessage: PropTypes.func.isRequired,
  /** If true, sendMessage button is hidden */
  canMessage: PropTypes.bool,
}

SurveyQuestion.defaultProps = {
  canMessage: true,
}

export default function SurveyQuestion({ questionText, answerText, answeredOn, onResolve, onSendMessage, canMessage }) {
  return (
    <div className="surveyquestion">
      <div className="surveyquestion-date-div">
        <span data-testid={`surveyquestion-content-answeredOn-${answeredOn}`}>Answered on {answeredOn}</span>
      </div>
      <div className="surveyquestion-questiontext" data-testid={`surveyquestion-content-questiontext-${questionText}`}>
        {questionText}
      </div>
      <div className="surveyquestion-answerwrap">
        <IconFlag data-testid={`surveyquestion-iconflag-${questionText}`} />{' '}
        <span className={`surveyquestion-answertext`} data-testid={`surveyquestion-answertext-${answerText}`}>
          {answerText}
        </span>
      </div>
      <div className="surveyquestion-buttonswrap">
        <ButtonGhost
          className={!canMessage ? 'fullwidth' : ''}
          data-testid={`surveyquestion-resolve-${questionText}`}
          onClick={onResolve}>
          Resolve
        </ButtonGhost>
        {canMessage && (
          <Button data-testid={`surveyquestion-sendmessage-${questionText}`} onClick={onSendMessage}>
            Send Message
          </Button>
        )}
      </div>
    </div>
  )
}
