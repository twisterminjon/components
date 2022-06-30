import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import AssessmentButtons from './AssessmentButtons'

const stories = storiesOf('Provider/v1/Molecules/AssessmentQuestion', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('AssessmentButtons', () => {
    const allowNext = boolean('allowNext', true)
    const status = {
      loadingForward: boolean('loadingForward', false),
      loadingBack: boolean('loadingBack', false),
    }

    return (
      <AssessmentButtons
        onPrevious={action('onPrevious')}
        onNext={action('onNext')}
        allowNext={allowNext}
        status={status}
      />
    )
  })
