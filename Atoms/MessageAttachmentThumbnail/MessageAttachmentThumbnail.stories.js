import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MessageAttachmentThumbnail from './MessageAttachmentThumbnail'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('MessageAttachmentThumbnail', () => {
  const timestampLab = 'timestamp'
  const timestampDef = '2020-08-08T13:30:00'
  const timestampVal = text(timestampLab, timestampDef)

  const sendingLab = 'sending'
  const sendingDef = false
  const sendingVal = boolean(sendingLab, sendingDef)

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 375,
        height: 628,
      }}>
      <MessageAttachmentThumbnail sending={sendingVal} timestamp={timestampVal} onClick={action('clicked')}>
        <img alt="attachment" src="https://www.fillmurray.com/800/1200" />
      </MessageAttachmentThumbnail>
    </div>
  )
})
