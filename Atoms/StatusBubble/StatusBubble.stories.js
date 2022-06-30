import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import StatusBubble from './StatusBubble'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('StatusBubble', () => {
  const statusLabel = 'Status'
  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const statusDefaultValue = USER_STATUS_AVAILABLE
  const statusValue = select(statusLabel, statusOptions, statusDefaultValue)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'olive',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBubble status={statusValue} />
    </div>
  )
})
