import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'

import TextAreaInput from '../../Molecules/TextAreaInput/TextAreaInput'
import Button from '../../Atoms/Button/Button'

import './PatientSurveyInterventionMessage.css'

const MESSAGE_TEMPLATE = `
%SURVEY_QUESTION%

Hi, %PATIENT_NAME%, just following up on your answer of "%SURVEY_ANSWER%."

`

PatientSurveyInterventionMessage.propTypes = {
  /** The patient's name */
  patientName: PropTypes.string.isRequired,
  /** The patient's profile image */
  profileImage: PropTypes.string.isRequired,
  /** The survey question with the intervention */
  surveyQuestion: PropTypes.string.isRequired,
  /** The patient's answer to the survey question */
  surveyAnswer: PropTypes.string.isRequired,
  /** Called after user wishes to send message regarding intervention */
  onSend: PropTypes.func.isRequired,
}

export default function PatientSurveyInterventionMessage({
  patientName,
  profileImage,
  surveyQuestion,
  surveyAnswer,
  onSend,
  ...rest
}) {
  const initialMessage = useMemo(() => {
    const initialMessage = MESSAGE_TEMPLATE.replace(/%SURVEY_QUESTION%/g, surveyQuestion)
      .replace(/%SURVEY_ANSWER%/g, surveyAnswer)
      .replace(/%PATIENT_NAME%/g, patientName)

    return initialMessage
  }, [patientName, surveyAnswer, surveyQuestion])

  const [message, setMessage] = useState(initialMessage)
  const [disabled, setDisabled] = useState(true)

  const handleChange = useCallback(
    evt => {
      const { value } = evt.target

      if (value === initialMessage) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }

      setMessage(value)
    },
    [initialMessage]
  )

  return (
    <div className="patientsurveyinterventionmessage-wrap" {...rest}>
      <form className="patientsurveyinterventionmessage" onSubmit={evt => evt.preventDefault()}>
        <div className="patientsurveyinterventionmessage-header">
          <Avatar
            className="patientsurveyinterventionmessage-patientavatar"
            data-testid="patientsurveyinterventionmessage-patientavatar"
            imgUrl={profileImage}
          />{' '}
          <span
            className="patientsurveyinterventionmessage-patientname"
            data-testid="patientsurveyinterventionmessage-patientname">
            {patientName}
          </span>
        </div>
        <div className="patientsurveyinterventionmessage-message-wrap">
          <TextAreaInput
            label="Message"
            maxLength={1024}
            name="patientsurveyinterventionmessage-message"
            data-testid="patientsurveyinterventionmessage-message"
            value={message}
            onChange={handleChange}
          />
        </div>
        <div className="patientsurveyinterventionmessage-buttonswrap">
          <Button
            onClick={() => onSend(message)}
            disabled={disabled}
            className="patientsurveyinterventionmessage-send"
            data-testid="patientsurveyinterventionmessage-send">
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}
