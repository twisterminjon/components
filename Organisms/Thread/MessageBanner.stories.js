import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import MessageBanner from './MessageBanner'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)

stories.add('MessageBanner', () => {
  const displayNameVal = text('displayName', 'Dr. Strange')

  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const statusVal = select('status', statusOptions, statusOptions.available)
  const avatarInteractiveVal = boolean('avatarInteractive', true)
  const canCallVal = boolean('canCall', true)

  return (
    <MessageBanner
      userId="1"
      displayName={displayNameVal}
      profileImage="https://www.fillmurray.com/200/200"
      status={statusVal}
      avatarInteractive={avatarInteractiveVal}
      canCall={canCallVal}
      onCall={user => {
        alert(`onCall=${user.id}`)
      }}
      onSelectAvatar={id => {
        alert(`onSelectAvatar ${id}`)
      }}
      onAddUser={() => {
        alert('onAddUser')
      }}
    />
  )
})
