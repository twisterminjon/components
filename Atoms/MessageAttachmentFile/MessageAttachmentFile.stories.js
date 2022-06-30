import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import MessageAttachmentFile from './MessageAttachmentFile'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MessageAttachmentFile', () => {
  const isOwnLab = 'isOwn'
  const isOwnDef = false
  const isOwnVal = boolean(isOwnLab, isOwnDef)

  const sendingLab = 'sending'
  const sendingDef = false
  const sendingVal = boolean(sendingLab, sendingDef)

  const messageLab = 'filename'
  const fileName = 'test_file.pdf'
  const filenameVal = text(messageLab, fileName)

  const timestampLab = 'timestamp'
  const timestampDef = '2020-08-08T13:30:00'
  const timestampVal = text(timestampLab, timestampDef)

  return (
    <div
      style={{
        width: 400,
      }}>
      <MessageAttachmentFile
        isOwn={isOwnVal}
        sending={sendingVal}
        timestamp={timestampVal}
        filename={filenameVal}
        onClick={action('clicked')}
      />
    </div>
  )
})
