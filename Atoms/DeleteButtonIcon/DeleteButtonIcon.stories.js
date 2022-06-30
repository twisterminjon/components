import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import DeleteButtonIcon from './DeleteButtonIcon'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('DeleteButtonIcon', () => {
  const disabledLab = 'disabled'
  const disabledDef = false
  const disabledVal = boolean(disabledLab, disabledDef)

  return (
    <DeleteButtonIcon
      onClick={() => {
        alert('clicked')
      }}
      disabled={disabledVal}
    />
  )
})
