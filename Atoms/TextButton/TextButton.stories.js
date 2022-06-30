import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import TextButton from './TextButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TextButton', () => {
  const contentLabel = 'content'
  const contentDefault = 'Clicky'
  const contentValue = text(contentLabel, contentDefault)

  return (
    <TextButton
      content={contentValue}
      onClick={() => {
        alert('clicked')
      }}
    />
  )
})
