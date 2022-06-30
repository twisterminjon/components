import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import PasswordInput from './PasswordInput'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'PasswordInput',
  withInfo()(() => {
    const valueLabel = 'value'
    const valueDefaultValue = 'password'
    const valueValue = text(valueLabel, valueDefaultValue)

    const errorLabel = 'error'
    const errorDefaultValue = "Really? 'password' for your password"
    const errorValue = text(errorLabel, errorDefaultValue)

    const showErrorLabel = 'showError'
    const showErrorDefaultValue = false
    const showErrorValue = boolean(showErrorLabel, showErrorDefaultValue)

    return (
      <div style={{ width: 400 }}>
        <PasswordInput value={valueValue} errorMessage={errorValue} hasError={showErrorValue} />
      </div>
    )
  })
)
