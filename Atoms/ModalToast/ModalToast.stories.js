import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ModalToast from './ModalToast'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('ModalToast', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)

  return <ModalToast show={showVal} />
})

stories.add('ModalToast with Header and text', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)
  const titleVal = text('title', 'This is the Title in ModalToast.Header')
  const textVal = text('text', 'This is the text in ModalToast.Text')
  const textVal2 = text('text2', 'This is another child')
  const buttonLabel = text('buttonLabel', 'Button with ModalToast.Button')

  return (
    <ModalToast show={showVal}>
      <ModalToast.Header title={titleVal} />
      <ModalToast.Text>
        <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>{textVal}</span>
        {textVal2}
      </ModalToast.Text>
      <ModalToast.Button buttonLabel={buttonLabel} fluid onClick={action('Click on Button')} />
      <ModalToast.Button isGhostButton={true} onClick={action('Click on Button')} />
    </ModalToast>
  )
})
