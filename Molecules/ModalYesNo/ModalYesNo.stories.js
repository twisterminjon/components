import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import ModalYesNo from './ModalYesNo'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('ModalYesNo', () => {
  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const titleLabel = 'title'
  const titleDefaultValue = 'Do you really want to delete the internet?'
  const titleValue = text(titleLabel, titleDefaultValue)

  const messageLabel = 'message'
  const messageDefaultValue =
    'I know the internet can be frustrating, but sometimes it is good (expect for those goat memes, those are just weird).'
  const messageValue = text(messageLabel, messageDefaultValue)

  const iconLlabel = 'icon'
  const iconOptions = {
    info: 'info',
    error: 'error',
    question: 'question',
    delete: 'delete',
    save: 'save',
    stop: 'stop',
  }
  const iconDefaultValue = 'delete'
  const iconValue = select(iconLlabel, iconOptions, iconDefaultValue)

  // Note this is only used on mount, so changing the value does not update the component
  // leaving here just to show how it is used
  const defaultIsConfirmLabel = 'defaultIsConfirm'
  const defaultIsConfirmDefaultValue = true
  const defaultIsConfirmValue = boolean(defaultIsConfirmLabel, defaultIsConfirmDefaultValue)

  return (
    <ModalYesNo
      show={showValue}
      icon={iconValue}
      title={titleValue}
      message={messageValue}
      onYes={() => {
        alert('Oh yes you did')
      }}
      onNo={() => {
        alert("Oh no you did't")
      }}
      defaultIsConfirm={defaultIsConfirmValue}
    />
  )
})
