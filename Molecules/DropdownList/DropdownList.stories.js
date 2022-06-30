import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import DropdownList from './DropdownList'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'DropdownList',
  withInfo()(() => {
    const labelLabel = 'label'
    const labelDefaultValue = 'Dreaming'
    const labelValue = text(labelLabel, labelDefaultValue)

    const placeholderLabel = 'placeholder'
    const placeholderDefaultValue = 'Where do dreams come from'
    const placeholderValue = text(placeholderLabel, placeholderDefaultValue)

    const errorLabel = 'error'
    const errorDefaultValue = 'Oopsy, I did it again'
    const errorValue = text(errorLabel, errorDefaultValue)

    const showErrorLabel = 'showError'
    const showErrorDefaultValue = false
    const showErrorValue = boolean(showErrorLabel, showErrorDefaultValue)

    const requiredLabel = 'required'
    const requiredDefaultValue = false
    const requiredValue = boolean(requiredLabel, requiredDefaultValue)

    const options = [
      { key: '1', value: '?', text: 'The netherworld' },
      { key: '2', value: 'Life', text: 'Life Itself' },
    ]

    return (
      <div style={{ width: 400 }}>
        <DropdownList
          name="dropdown"
          label={labelValue}
          placeholder={placeholderValue}
          errorMessage={errorValue}
          hasError={showErrorValue}
          required={requiredValue}
          options={options}
          fluid
          multiple
          selection
        />
      </div>
    )
  })
)
