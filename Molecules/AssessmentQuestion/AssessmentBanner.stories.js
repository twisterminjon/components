import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import AssessmentBanner from './AssessmentBanner'
import { survey } from '../../../Mocks/Assessments.mock'

const stories = storiesOf('Provider/v1/Molecules/AssessmentQuestion', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('AssessmentBanner', () => <AssessmentBanner title={survey.title} />)
