import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Button from './Button'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Button', () => {
  const textName = 'text'
  const textDefaultValue = 'Save'
  const textValue = text(textName, textDefaultValue)

  return <Button>{textValue}</Button>
})
