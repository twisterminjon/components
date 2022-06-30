import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import UserCardCallHistory from './UserCardCallHistory'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('UserCardCallHistory', () => {
  const displayNameVal = text('displayName', 'The Black Widow')

  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const statusVal = select('status', statusOptions, USER_STATUS_AVAILABLE)
  const missedVal = boolean('missed', false)

  const typeOpts = {
    INCOMING: 'INCOMING',
    OUTGOING: 'OUTGOING',
  }
  const typeVal = select('type', typeOpts, 'INCOMING')
  const canDialVal = boolean('canDial', true)
  const dialingAllowed = boolean('dialingAllowed', true)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      }}>
      <UserCardCallHistory
        type={typeVal}
        date="2020-01-28T21:30:15"
        displayName={displayNameVal}
        profileImage="https://www.fillmurray.com/500/500"
        canDial={canDialVal}
        onDial={id => action(`dial id=${id}`)}
        dialingAllowed={dialingAllowed}
        status={statusVal}
        missed={missedVal}
      />
    </div>
  )
})
