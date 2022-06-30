import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ModalLogoutAllToast from './ModalLogoutAllToast'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('ModalLogoutAllToast', () => {
  const show = boolean('show', true)
  const onLogoutThisDevice = action('onLogoutThisDevice')
  const onLogoutAll = action('onLogoutAll')
  const onCancel = action('onCancel')

  return (
    <ModalLogoutAllToast
      show={show}
      onLogoutThisDevice={onLogoutThisDevice}
      onLogoutAll={onLogoutAll}
      onCancel={onCancel}
    />
  )
})
