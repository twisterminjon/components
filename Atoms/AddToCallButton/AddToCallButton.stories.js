import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import AddToCallButton from './AddToCallButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('AddToCallButton', () => {
  const textName = 'text'
  const textDefaultValue = 'Caregiver'
  const textValue = text(textName, textDefaultValue)

  const disabledName = 'disabled'
  const disabledDefaultValue = false
  const disabledValue = boolean(disabledName, disabledDefaultValue)

  return <AddToCallButton disabled={disabledValue}>{textValue}</AddToCallButton>
})
