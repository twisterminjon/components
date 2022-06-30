import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import EditProgramButton from './EditProgramButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('EditProgramButton', () => {
  const disabledLab = 'disabled'
  const disabledDef = false
  const disabledVal = boolean(disabledLab, disabledDef)

  return (
    <EditProgramButton
      onClick={() => {
        alert('clicked')
      }}
      disabled={disabledVal}
    />
  )
})
