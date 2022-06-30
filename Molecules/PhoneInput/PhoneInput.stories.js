import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PhoneInput from './PhoneInput'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'PhoneInput',
  withInfo()(() => {
    const nameLabel = 'name'
    const nameDefaultValue = 'idiot-input'
    const nameValue = text(nameLabel, nameDefaultValue)

    const labelLabel = 'label'
    const labelDefaultValue = "What's your number?"
    const labelValue = text(labelLabel, labelDefaultValue)

    const valueLabel = 'value'
    const valueDefaultValue = '+79123456789'
    const valueValue = text(valueLabel, valueDefaultValue)

    const placeholderLabel = 'placeholder'
    const placeholderDefaultValue = 'Enter phone number'
    const placeholderValue = text(placeholderLabel, placeholderDefaultValue)

    const errorLabel = 'error'
    const errorDefaultValue = "That's a fake number!"
    const errorValue = text(errorLabel, errorDefaultValue)

    const showErrorLabel = 'showError'
    const showErrorDefaultValue = false
    const showErrorValue = boolean(showErrorLabel, showErrorDefaultValue)

    const hintMessageLabel = 'hintMessage'
    const hintMessageDefaultValue = 'Wanna go for a drink?'
    const hintMessageValue = text(hintMessageLabel, hintMessageDefaultValue)

    const hintTextLabel = 'hintText'
    const hintTextDefaultValue = "I'm one of the normal ones"
    const hintTextValue = text(hintTextLabel, hintTextDefaultValue)

    const requiredLabel = 'required'
    const requiredDefaultValue = false
    const requiredValue = boolean(requiredLabel, requiredDefaultValue)

    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          name={nameValue}
          label={labelValue}
          value={valueValue}
          placeholder={placeholderValue}
          errorMessage={errorValue}
          hasError={showErrorValue}
          hintMessage={hintMessageValue}
          hintText={hintTextValue}
          required={requiredValue}
          onChange={action('onChange')}
        />
      </div>
    )
  })
)
