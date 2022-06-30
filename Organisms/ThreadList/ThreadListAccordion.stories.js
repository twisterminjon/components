import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ThreadListAccordion from './ThreadListAccordion'
import ThreadListCard from './ThreadListCard'
import { AddButton } from './ThreadList'

import threads from '../../../Mocks/ThreadList.mock'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)

stories.addDecorator(withKnobs).add('ThreadListAccordion', () => {
  const unreadVal = boolean('unread', false)

  const cards = threads.map(thread => {
    return <ThreadListCard key={thread.id} thread={thread} selected={false} onClick={action('onClick')} />
  })

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        left: 0,
        overflow: 'hidden',
      }}>
      <ThreadListAccordion
        name="messages"
        label="Messages"
        unread={unreadVal}
        renderControls={<AddButton onClick={action('onClick')} />}>
        {cards}
      </ThreadListAccordion>
      <ThreadListAccordion name="Messages" label="Messages" startOpen>
        {cards}
      </ThreadListAccordion>
    </div>
  )
})
