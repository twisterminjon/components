import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import MessageAttachmentBanner from './MessageAttachmentBanner'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('MessageAttachmentBanner', () => {
  return (
    <MessageAttachmentBanner
      onClose={() => {
        alert('clicked close')
      }}
      onDownload={() => {
        alert('clicked download')
      }}
    />
  )
})
