import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { MessageStatus } from '@shared/helpers'

import Message from './Message'
import MessageText from '../../Atoms/MessageText/MessageText'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Message', () => {
  const textLong =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere dolores vero. Eum laborum dicta nesciunt eveniet exercitationem! Odio esse recusandae voluptate totam pariatur quis eum amet soluta ipsam distinctio.'
  const textShort = 'What up, dog?'

  const textLab = 'Short Text'
  const textDef = false
  const textVal = boolean(textLab, textDef)
  const textDisplay = textVal ? textShort : textLong

  const isOwnLab = 'isOwn'
  const isOwnDef = true
  const isOwnVal = boolean(isOwnLab, isOwnDef)

  const status = select('status', MessageStatus, MessageStatus.Succeed)

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.05)',
      }}>
      <Message
        status={status}
        isOwn={isOwnVal}
        onRetry={action('onRetry')}
        profileImage="https://www.fillmurray.com/60/60"
        timestamp="2018-12-05T10:30:15">
        <MessageText>{textDisplay}</MessageText>
      </Message>
    </div>
  )
})
