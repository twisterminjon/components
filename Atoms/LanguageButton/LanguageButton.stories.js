import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import LanguageButton from './LanguageButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('LanguageButton', () => {
  const textLabel = 'label'
  const textDefault = 'Finish'
  const textValue = text(textLabel, textDefault)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LanguageButton
        label={textValue}
        name={textValue}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  )
})
