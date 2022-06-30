import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Assessment from './Assessment'
import { surveys } from '../../../Mocks/Assessments.mock'

const stories = storiesOf('Provider/v1/Views', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('Assessment', () => <Assessment surveys={surveys} onOpenSurvey={action('onOpenSurvey')} />)
