import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import TitleText from './TitleText'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TitleText', () => {
  const textLabel = 'title'
  const textDefaultValue = 'Title name'
  const textValue = text(textLabel, textDefaultValue)

  return <TitleText title={textValue} />
})
