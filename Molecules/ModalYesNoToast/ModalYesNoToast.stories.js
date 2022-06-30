import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import ModalYesNoToast from './ModalYesNoToast'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('ModalYesNoToast', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)

  const titleLab = 'title'
  const titleDef = 'Do you really want to delete the internet?'
  const titleVal = text(titleLab, titleDef)

  const messageLab = 'message'
  const messageDef =
    'I know the internet can be frustrating, but sometimes it is good (expect for those goat memes, those are just weird).'
  const messageVal = text(messageLab, messageDef)

  const confirmButtonTextLab = 'confirmButtonText'
  const confirmButtonTextDef = 'Burn it down'
  const confirmButtonTextVal = text(confirmButtonTextLab, confirmButtonTextDef)

  const rejectButtonTextLab = 'rejectButtonText'
  const rejectButtonTextDef = 'Noes, I like the interwebs!'
  const rejectButtonTextVal = text(rejectButtonTextLab, rejectButtonTextDef)

  const flipLab = 'flip'
  const flipDef = false
  const flipVal = boolean(flipLab, flipDef)

  const defaultIsConfirmLab = 'defaultIsConfirm'
  const defaultIsConfirmDef = false
  const defaultIsConfirmVal = boolean(defaultIsConfirmLab, defaultIsConfirmDef)

  return (
    <ModalYesNoToast
      show={showVal}
      title={titleVal}
      message={messageVal}
      confirmButtonText={confirmButtonTextVal}
      rejectButtonText={rejectButtonTextVal}
      flip={flipVal}
      onConfirm={() => {
        alert('Oh yes you did')
      }}
      onReject={() => {
        alert("Oh no you did't")
      }}
      defaultIsConfirm={defaultIsConfirmVal}
    />
  )
})
