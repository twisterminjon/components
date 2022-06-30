import React from 'react'

import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PhoneCountrySelector from './PhoneCountrySelector'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add(
  'PhoneCountrySelector',
  withInfo()(() => {
    const nameLabel = 'name'
    const nameDefaultValue = 'country-selector'
    const nameValue = text(nameLabel, nameDefaultValue)

    const valueLabel = 'value'
    const valueDefaultValue = 'US'
    const valueValue = text(valueLabel, valueDefaultValue)

    return (
      <div style={{ width: 200 }}>
        <PhoneCountrySelector name={nameValue} value={valueValue} onChange={action('onChange')} button fluid />
      </div>
    )
  })
)
