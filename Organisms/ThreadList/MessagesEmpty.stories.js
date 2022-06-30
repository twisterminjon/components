import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import MessagesEmpty from './MessagesEmpty'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)
stories.addDecorator(withKnobs)

stories.add('MessagesEmpty', () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 100,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <MessagesEmpty />
    </div>
  )
})
