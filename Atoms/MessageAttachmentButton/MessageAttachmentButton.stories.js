import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import MessageAttachmentButton from './MessageAttachmentButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MessageAttachmentButton', () => {
  const disabledLab = 'disabled'
  const disabledDef = false
  const disabledVal = boolean(disabledLab, disabledDef)

  const ref = React.createRef()

  return (
    <MessageAttachmentButton
      onClick={() => {
        alert('clicked')
      }}
      disabled={disabledVal}
      hiddenInput={ref}
    />
  )
})
