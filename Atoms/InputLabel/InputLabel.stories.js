import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import InputLabel from './InputLabel'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('InputLabel', () => {
  const textLabel = 'label'
  const textDefaultValue = 'Input Label'
  const textValue = text(textLabel, textDefaultValue)

  return <InputLabel label={textValue} />
})
