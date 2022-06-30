import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AssessmentCompleted from './AssessmentCompleted'

const stories = storiesOf('Provider/v1/Views', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('AssessmentCompleted', () => {
    const title = text('title', 'Assessment title')
    const status = {
      loadingForward: boolean('loadingForward', false),
      loadingBack: boolean('loadingBack', false),
    }

    return (
      <AssessmentCompleted title={title} onBack={action('onBack')} onComplete={action('onComplete')} status={status} />
    )
  })
