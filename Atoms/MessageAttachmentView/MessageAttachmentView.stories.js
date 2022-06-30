import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import MessageAttachmentView from './MessageAttachmentView'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('MessageAttachmentView', () => {
  return (
    <div
      style={{
        width: 375,
        height: 628,
      }}>
      <MessageAttachmentView
        onClick={() => {
          alert('clicked')
        }}>
        <img alt="attachment" src="https://www.fillmurray.com/800/1200" />
      </MessageAttachmentView>
    </div>
  )
})
