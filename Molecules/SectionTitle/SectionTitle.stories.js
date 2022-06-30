import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import SectionTitle from './SectionTitle'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('SectionTitle', () => {
  const textLabel = 'title'
  const textDefaultValue = 'The stash'
  const textValue = text(textLabel, textDefaultValue)

  const hintLabel = 'hint'
  const hintDefaultValue = 'Psst..here is a secret ;)'
  const hintValue = text(hintLabel, hintDefaultValue)

  const buttonLabel = 'buttonLabel'
  const buttonDefaultValue = 'Add'
  const buttonValue = text(buttonLabel, buttonDefaultValue)

  return (
    <div style={{ width: 400 }}>
      <SectionTitle
        title={textValue}
        hint={hintValue}
        label={buttonValue}
        onButtonClick={() => {
          alert('Clicked Add')
        }}
      />
    </div>
  )
})
