import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MessageBannerGroup from './MessageBannerGroup'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)

stories.addDecorator(withKnobs).add('MessageBannerGroup', () => {
  const name = text('name', 'Lions and Tigers and Bears oh my!')

  return <MessageBannerGroup name={name} onAdd={action('onAdd')} />
})
