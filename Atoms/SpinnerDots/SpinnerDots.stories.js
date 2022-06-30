import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import SpinnerDots from './SpinnerDots'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'SpinnerDots',
  withInfo()(() => {
    const textLabel = 'label'
    const textDefaultValue = 'Input Label'
    const textValue = text(textLabel, textDefaultValue)

    return <SpinnerDots label={textValue} />
  })
)
