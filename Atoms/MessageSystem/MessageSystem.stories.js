import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'

import MessageSystem from './MessageSystem'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MessageSystem', () => {
  const textVal = text('text', 'Dr. Kranky was added')
  const typeOpts = {
    USER_ADDED: 'USER_ADDED',
    GROUP_CREATED: 'GROUP_CREATED',
    INTERVENTION_STARTED: 'INTERVENTION_STARTED',
    INTERVENTION_RESOLVE: 'INTERVENTION_RESOLVE',
    INTERVENTION_COMPLETE: 'INTERVENTION_COMPLETE',
    UNREAD_LINE: 'UNREAD_LINE',
  }
  const typeVal = select('type', typeOpts, 'USER_ADDED')

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        left: 0,
      }}>
      <MessageSystem text={textVal} type={typeVal} />
    </div>
  )
})
