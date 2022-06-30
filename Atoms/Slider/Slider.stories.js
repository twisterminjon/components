import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import { withKnobs, text, number } from '@storybook/addon-knobs'

import Slider from './Slider'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Slider', () => {
  const nameLabel = 'label'
  const nameDefaultValue = 'Volume'
  const nameValue = text(nameLabel, nameDefaultValue)

  const valueLabel = 'value'
  const defaultValue = 50
  const options = {
    range: true,
    min: 0,
    max: 100,
    step: 10,
  }
  const value = number(valueLabel, defaultValue, options)

  return (
    <div style={{ width: '400px' }}>
      <Slider min={0} max={100} value={value} label={nameValue} onChange={() => {}} />
    </div>
  )
})
