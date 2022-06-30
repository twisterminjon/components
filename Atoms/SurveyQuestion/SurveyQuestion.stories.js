import React from 'react'
import StoryRouter from 'storybook-react-router'

import CenterView from '../../../storybookUtils/CenterView'

import SurveyQuestion from './SurveyQuestion'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)
stories.addDecorator(getStories => <CenterView>{getStories()}</CenterView>)

stories.addDecorator(StoryRouter()).add('SurveyQuestion', () => {
  const questionText = text('questionText', 'How old are your pain meds?')
  const answerText = text('answerText', '5 months old')
  const canMessage = boolean('canMessage', true)

  return (
    <SurveyQuestion
      questionText={questionText}
      answerText={answerText}
      onResolve={() => alert('onResolve()')}
      onSendMessage={() => alert('onSendMessage()')}
      canMessage={canMessage}
    />
  )
})
