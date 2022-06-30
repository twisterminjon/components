import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import TextAreaInput from './TextAreaInput'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'TextAreaInput',
  withInfo()(() => {
    const labelLabel = 'label'
    const labelDefaultValue = 'label'
    const labelValue = text(labelLabel, labelDefaultValue)

    const valueLabel = 'value'
    const valueDefaultValue = 'Ren and Stimpy'
    const valueValue = text(valueLabel, valueDefaultValue)

    const hinttextLabel = 'hintText'
    const hinttextDefaultValue = 'Stimpy is a cat, Ren is a dog'
    const hinttextValue = text(hinttextLabel, hinttextDefaultValue)

    const errorLabel = 'error'
    const errorDefaultValue = 'Oh noes, something is brokendy'
    const errorValue = text(errorLabel, errorDefaultValue)

    const showErrorLabel = 'showError'
    const showErrorDefaultValue = false
    const showErrorValue = boolean(showErrorLabel, showErrorDefaultValue)

    const requiredLabel = 'required'
    const requiredDefaultValue = false
    const requiredValue = boolean(requiredLabel, requiredDefaultValue)

    return (
      <div style={{ width: 400 }}>
        <TextAreaInput
          name="story-input"
          label={labelValue}
          value={valueValue}
          errorMessage={errorValue}
          hasError={showErrorValue}
          hintText={hinttextValue}
          required={requiredValue}
        />
      </div>
    )
  })
)
