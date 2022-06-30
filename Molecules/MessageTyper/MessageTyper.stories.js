import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MessageTyper from './MessageTyper'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MessageTyper', () => {
  const message = text('message', 'Some message')
  const generalMessageVal = text('generalMessage', 'Dr. Aubrey Kildig is away and may not be able to respond')

  return (
    <div
      style={{
        width: 375,
        height: 300,
        backgroundColor: '#222',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <MessageTyper
        message={message}
        setMessage={action('setMessage')}
        generalMessage={generalMessageVal}
        onSend={action('onSend')}
      />
    </div>
  )
})
