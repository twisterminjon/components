import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import TextInputField from './TextInputField'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'TextInputField',
  withInfo()(() => {
    const textLabel = 'value'
    const textDefaultValue = ''
    const textValue = text(textLabel, textDefaultValue)

    const placeholderLabel = 'placeholder'
    const placeholderDefaultValue = "Who's a good boy"
    const placeholderValue = text(placeholderLabel, placeholderDefaultValue)

    const hasErrorLabel = 'hasError'
    const hasErrorDefaultValue = false
    const hasErrorValue = boolean(hasErrorLabel, hasErrorDefaultValue)

    return (
      <div style={{ width: 400 }}>
        <TextInputField value={textValue} hasError={hasErrorValue} placeholder={placeholderValue} />
      </div>
    )
  })
)
