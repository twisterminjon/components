import React from 'react'
import StoryRouter from 'storybook-react-router'

import CenterView from '../../../storybookUtils/CenterView'

import PatientSurveyInterventionMessage from './PatientSurveyInterventionMessage'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)
stories.addDecorator(getStory => <CenterView inverted>{getStory()}</CenterView>)

stories.addDecorator(StoryRouter()).add('PatientSurveyInterventionMessage', () => {
  const patientName = text('patientName', 'Stacy Gomez')
  const profileImage = text('profileImage', 'https://www.fillmurray.com/200/200')
  const surveyQuestion = text('surveyQuestion', 'What is your favorite color?')
  const surveyAnswer = text('surveyAnswer', `I don't know`)

  return (
    <PatientSurveyInterventionMessage
      patientName={patientName}
      profileImage={profileImage}
      surveyQuestion={surveyQuestion}
      surveyAnswer={surveyAnswer}
      onSend={finalMessage => alert(`onSend('${finalMessage}')`)}
    />
  )
})
