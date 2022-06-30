import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AssessmentQuestion from './AssessmentQuestion'
import { questionsData } from '../../../Mocks/Assessments.mock'

const stories = storiesOf('Provider/v1/Views', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('AssessmentQuestion', () => {
    const title = text('title', 'Assessment title')
    const status = {
      loadingForward: boolean('loadingForward', false),
      loadingBack: boolean('loadingBack', false),
    }

    const valueOpts = {
      radio: 'radio',
      flag: 'flag',
      check: 'check',
      text: 'text',
      photo: 'photo',
      scale: 'scale',
    }
    const questionType = select('questionType', valueOpts, valueOpts.radio)

    return (
      <AssessmentQuestion
        key={questionType}
        title={title}
        status={status}
        onPrevious={action('onPrevious')}
        onNext={action('onNext')}
        question={questionsData.find(({ type }) => type === questionType)}
      />
    )
  })
