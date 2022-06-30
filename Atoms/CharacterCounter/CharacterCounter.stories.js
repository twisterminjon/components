import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import CharacterCounter from './CharacterCounter'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('CharacterCounter', () => {
  const textLabel = 'text'
  const textDefault = 'I am an sms message of xxx characters'
  const textValue = text(textLabel, textDefault)

  const maxLengthLabel = 'maxLength'
  const maxLengthDefault = 430
  const maxLength = number(maxLengthLabel, maxLengthDefault)

  return <CharacterCounter text={textValue} maxLength={maxLength} />
})
