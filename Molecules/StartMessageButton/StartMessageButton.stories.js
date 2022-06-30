import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import StartMessageButton from './StartMessageButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('StartMessageButton', () => {
  const typeLab = 'type'
  const typeDef = 'secure'
  const typeOpts = {
    secure: 'secure',
    ondemand: 'ondemand',
  }
  const typeVal = select(typeLab, typeOpts, typeDef)

  const ghostLabel = 'ghost'
  const ghostDefault = false
  const ghostValue = boolean(ghostLabel, ghostDefault)

  // FIXME: disabled is not included as it doesn't work properly. It has to be fixed in the CallButton
  // component and I don't want to touch that at the moment (getting 2.1 out) but needs to be fixed
  // when addressing tech debt.

  return (
    <div>
      <StartMessageButton
        type={typeVal}
        onClick={() => {
          alert('clicked')
        }}
        ghost={ghostValue}
      />
    </div>
  )
})
