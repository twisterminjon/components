import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ScaleQuestion from './ScaleQuestion'
import { ScaleQuestionData } from '../../../Mocks/Assessments.mock'

const stories = storiesOf('Provider/v1/Molecules/AssessmentQuestion', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('ScaleQuestion', () => <ScaleQuestion data={ScaleQuestionData.options} onChange={action('onChange')} />)
