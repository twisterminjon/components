import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'

import ToastMessage from './ToastMessageClosable'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('ToastMessageClosable', () => {
  const typeLabel = 'type'
  const typeOptions = {
    info: 'info',
    warning: 'warning',
    error: 'error',
  }
  const typeDefaultValue = 'info'
  const typeValue = select(typeLabel, typeOptions, typeDefaultValue)

  const messageLabel = 'message'
  const messageDefaultValue = 'This is a temporary message that can be closed.'
  const messageValue = text(messageLabel, messageDefaultValue)

  return (
    <div>
      <ToastMessage type={typeValue} message={messageValue} />
      <span>Note: you need to refresh the browser screen after closing to toast to show it again.</span>
    </div>
  )
})
