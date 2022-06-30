import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import ContactTypes from './ContactTypes'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ContactTypes', () => {
  const displayOnlyLabel = 'displayOnly'
  const displayOnlyDef = 'EMAIL'
  const displayOnlyVal = boolean(displayOnlyLabel, displayOnlyDef)

  return (
    <div style={{ width: 600 }}>
      <ContactTypes
        value="EMAIL"
        onChange={value => {
          alert(`You picked ${value}`)
        }}
        displayOnly={displayOnlyVal}
      />
    </div>
  )
})
