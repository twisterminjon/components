import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import AnswerCallButton from './AnswerCallButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('AnswerCallButton', () => {
  const ghostLabel = 'ghost'
  const ghostDefault = false
  const ghostValue = boolean(ghostLabel, ghostDefault)

  const sizeLabel = 'Size'
  const options = {
    small: 'small',
    medium: 'medium',
  }
  const defaultValue = 'medium'
  const value = select(sizeLabel, options, defaultValue)

  return (
    <div>
      <AnswerCallButton ghost={ghostValue} size={value} />
    </div>
  )
})
