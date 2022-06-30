import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AssessmentIntro from './AssessmentIntro'

const stories = storiesOf('Provider/v1/Views', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('AssessmentIntro', () => {
    const title = text('title', 'Assessment title')
    const description = text('description', 'Description')
    const completeBy = text('completeBy', 'MM-DD-YYYY')
    const estimate = text('estimate', '10')
    const loading = boolean('loading', false)
    const isStarted = boolean('isStarted', false)

    return (
      <AssessmentIntro
        title={title}
        isStarted={isStarted}
        description={description}
        loading={loading}
        completeBy={completeBy}
        estimate={estimate}
        onCancel={action('onCancel')}
        onStart={action('onStart')}
      />
    )
  })
