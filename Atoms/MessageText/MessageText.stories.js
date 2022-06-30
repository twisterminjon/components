import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import MessageText from './MessageText'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MessageText', () => {
  const isOwnLab = 'isOwn'
  const isOwnDef = false
  const isOwnVal = boolean(isOwnLab, isOwnDef)

  const messageLab = 'message'
  const messageDef =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere dolores vero. Eum laborum dicta nesciunt eveniet exercitationem! Odio esse recusandae voluptate totam pariatur quis eum amet soluta ipsam distinctio.'
  const messageVal = text(messageLab, messageDef)

  const timestampLab = 'timestamp'
  const timestampDef = '2020-08-08T13:30:00'
  const timestampVal = text(timestampLab, timestampDef)

  return (
    <div
      style={{
        width: 400,
      }}>
      <MessageText timestamp={timestampVal} isOwn={isOwnVal}>
        {messageVal}
      </MessageText>
    </div>
  )
})
