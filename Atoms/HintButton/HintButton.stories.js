import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import HintButton from './HintButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('HintButton', () => {
  const contentLabel = 'message'
  const contentDefaultValue = "I'm a hint button, I give extra information about something!"
  const contentValue = text(contentLabel, contentDefaultValue)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'palevioletred',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <HintButton message={contentValue} />
    </div>
  )
})
