import React from 'react'
import StoryRouter from 'storybook-react-router'

import CenterView from '../../../storybookUtils/CenterView'

import PatientSurveyIntervention from './PatientSurveyIntervention'
import { mockInterventions } from '../../../Mocks/Interventions.mock'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

stories.addDecorator(StoryRouter()).add('PatientSurveyIntervention', () => {
  /** Empties the interventions list */
  const clearInterventions = boolean('container:clearInterventions', false)
  const interventions = array('interventions', !clearInterventions ? mockInterventions : [])

  const assignedOn = text('assignedOn', '2020-01-01')
  const patientName = text('patientName', 'Stacy Gomez')
  const profileImage = text('profileImage', 'https://www.fillmurray.com/200/200')
  const canMessage = boolean('canMessage', false)

  return (
    <PatientSurveyIntervention
      assignedOn={assignedOn}
      patientName={patientName}
      profileImage={profileImage}
      interventions={interventions}
      onResolve={answerId => alert(`onResolve(${answerId})`)}
      onSendMessage={answerId => alert(`onSendMessage(${answerId})`)}
      canMessage={canMessage}
    />
  )
})
