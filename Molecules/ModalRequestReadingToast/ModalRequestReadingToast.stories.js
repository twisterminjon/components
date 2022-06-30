import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import ModalRequestReadingToast from './ModalRequestReadingToast'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('ModalRequestReadingToast', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)

  return <ModalRequestReadingToast show={showVal} onRequest={action('onRequest')} onCancel={action('onCancel')} />
})
