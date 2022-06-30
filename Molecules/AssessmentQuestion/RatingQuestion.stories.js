import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import RatingQuestion from './RatingQuestion.css'
import { RatingQuestionData } from '../../../Mocks/Assessments.mock'

const stories = storiesOf('Provider/v1/Molecules/AssessmentQuestion', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('RatingQuestion', () => <RatingQuestion data={RatingQuestionData.options} onChange={action('onChange')} />)
