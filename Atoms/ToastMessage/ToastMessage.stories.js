import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import ToastMessage from './ToastMessage'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('ToastMessage', () => {
  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const disableInputLabel = 'disableInput'
  const disableInputDefaultValue = true
  const disableInputValue = boolean(disableInputLabel, disableInputDefaultValue)

  const typeLabel = 'type'
  const typeOptions = {
    info: 'info',
    warning: 'warning',
    error: 'error',
  }
  const typeDefaultValue = 'info'
  const typeValue = select(typeLabel, typeOptions, typeDefaultValue)

  const messageLabel = 'message'
  const messageDefaultValue = 'Network not connected. Please check your connection.'
  const messageValue = text(messageLabel, messageDefaultValue)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
      }}>
      <ToastMessage show={showValue} type={typeValue} message={messageValue} disableInput={disableInputValue} />
    </div>
  )
})
