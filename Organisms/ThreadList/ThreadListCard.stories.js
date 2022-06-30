import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ThreadListCard from './ThreadListCard'
import { ThreadStatus } from '@shared/helpers'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ThreadListCard', () => {
  const nameVal = text('name', 'Dr. Strange')
  const unreadVal = boolean('unread', false)
  const isOwnVal = boolean('isOwn', false)
  const isGroupVal = boolean('isGroup', false)
  const status = select('status', ThreadStatus, ThreadStatus.SENT)
  const selectedVal = boolean('selected', false)
  const messageVal = text('message', 'Is my appointment today at 12:30 Or is it tmr?')
  const showDraftPreviewVal = boolean('showDraftPreview', true)
  const showDraftNotificationVal = boolean('showDraftNotification', false)

  const thread = {
    isGroup: isGroupVal,
    isOwn: isOwnVal,
    name: nameVal,
    groupName: 'groupName',
    profileImage: 'https://www.fillmurray.com/400/400',
    message: messageVal,
    timestamp: '2018-01-01T10:30:15',
    unread: unreadVal,
    membersCount: 2,
    status,
    showDraftPreview: showDraftPreviewVal,
    showDraftNotification: showDraftNotificationVal,
    threadName: nameVal,
    threadMessage: messageVal,
  }

  return (
    <div
      style={{
        width: 320,
      }}>
      <ThreadListCard thread={thread} selected={selectedVal} onClick={action('onClick')} />
    </div>
  )
})
