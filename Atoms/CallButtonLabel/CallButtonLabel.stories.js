import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import CallButtonLabel from './CallButtonLabel'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('CallButtonLabel', () => {
  const textLabel = 'text'
  const textDefaultValue = 'Accept'
  const textValue = text(textLabel, textDefaultValue)

  return <CallButtonLabel text={textValue} />
})
