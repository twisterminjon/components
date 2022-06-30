import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import DateInput from './DateInput'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('DateInput', () => {
  const nameLabel = 'name'
  const nameDefaultValue = 'storybook-date'
  const nameValue = text(nameLabel, nameDefaultValue)

  const labelLabel = 'label'
  const labelDefaultValue = 'Date of Birth'
  const labelValue = text(labelLabel, labelDefaultValue)

  const valueLabel = 'value'
  const valueDefaultValue = '2011-04-01'
  const valueValue = text(valueLabel, valueDefaultValue)

  const placeholderLabel = 'placeholder'
  const placeholderDefaultValue = 'MM/DD/YYYY'
  const placeholderValue = text(placeholderLabel, placeholderDefaultValue)

  const hintTextLabel = 'hintText'
  const hintTextDefaultValue = 'Use MM/DD/YYYY format'
  const hintTextValue = text(hintTextLabel, hintTextDefaultValue)

  const errorLabel = 'error'
  const errorDefaultValue = 'Oh noes, something is brokendy'
  const errorValue = text(errorLabel, errorDefaultValue)

  const hasErrorLabel = 'hasError'
  const hasErrorDefaultValue = false
  const hasErrorValue = boolean(hasErrorLabel, hasErrorDefaultValue)

  const requiredLabel = 'required'
  const requiredDefaultValue = false
  const requiredValue = boolean(requiredLabel, requiredDefaultValue)

  const displayOnlyLabel = 'displayOnly'
  const displayOnlyDefaultValue = false
  const displayOnlyValue = boolean(displayOnlyLabel, displayOnlyDefaultValue)

  return (
    <div style={{ width: 400 }}>
      <DateInput
        name={nameValue}
        label={labelValue}
        value={valueValue}
        placeholder={placeholderValue}
        hintText={hintTextValue}
        errorMessage={errorValue}
        hasError={hasErrorValue}
        onChange={() => {}}
        required={requiredValue}
        displayOnly={displayOnlyValue}
      />
    </div>
  )
})
