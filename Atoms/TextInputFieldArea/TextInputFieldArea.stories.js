import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import TextInputFieldArea from './TextInputFieldArea'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'TextInputFieldArea',
  withInfo()(() => {
    const hasErrorLabel = 'hasError'
    const hasErrorDefaultValue = false
    const hasErrorValue = boolean(hasErrorLabel, hasErrorDefaultValue)

    return (
      <div style={{ width: 300 }}>
        <TextInputFieldArea hasError={hasErrorValue} />
      </div>
    )
  })
)
