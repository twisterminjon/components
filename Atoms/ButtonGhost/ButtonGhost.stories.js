import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import ButtonGhost from './ButtonGhost'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ButtonGhost', () => {
  const textName = 'text'
  const textDefaultValue = 'Ghost Button'
  const textValue = text(textName, textDefaultValue)

  const disabledName = 'disabled'
  const disabledDefaultValue = false
  const disabledValue = boolean(disabledName, disabledDefaultValue)

  const redName = 'red'
  const redDefaultValue = false
  const redValue = boolean(redName, redDefaultValue)

  return (
    <ButtonGhost disabled={disabledValue} red={redValue}>
      {textValue}
    </ButtonGhost>
  )
})
