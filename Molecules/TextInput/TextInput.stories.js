import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import TextInput from './TextInput'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'TextInput',
  withInfo()(() => {
    const nameVal = text('name', 'idiot')
    const labelVal = text('label', 'Who is an idiot')
    const valueVal = text('val', 'Stimpy')
    const placeholderVal = text('placeholder', 'Answer the question!')
    const errorVal = text('error', 'Stimpy was an idiot')
    const hasErrorVal = boolean('hasError', false)
    const hintMessageVal = text('hintMessage', 'Enter the name of the friend Ren refers to as an idiot')
    const hintTextVal = text('hintText', 'Ren frequently calls which friend this?')
    const requiredVal = boolean('required', false)
    const displayOnlyVal = boolean('displayOnly', false)

    return (
      <div style={{ width: 400 }}>
        <TextInput
          name={nameVal}
          label={labelVal}
          value={valueVal}
          placeholder={placeholderVal}
          errorMessage={errorVal}
          hasError={hasErrorVal}
          hintMessage={hintMessageVal}
          hintText={hintTextVal}
          required={requiredVal}
          displayOnly={displayOnlyVal}
        />
      </div>
    )
  })
)
