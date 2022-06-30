import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ThreadList from './ThreadList'
import threads from '../../../Mocks/ThreadList.mock'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('ThreadList', () => {
  const selectedIdOpts = {
    room1: 'thread 1',
    room2: 'thread 2',
    room3: 'thread 3',
  }
  const selectedIdVal = select('selectedId', selectedIdOpts, 'thread 2')
  const loadingVal = boolean('loading', false)

  const filterVal = text('filter', '')

  return (
    <div>
      <ThreadList
        threads={threads}
        selectedId={selectedIdVal}
        filter={filterVal}
        onClick={action('onClick')}
        onThreadClick={action('onThreadChange')}
        onSearch={action('onSearch')}
        onShowGroupEditor={action('onShowGroupEditor')}
        hasMoreThreads={false}
        loading={loadingVal}
      />
    </div>
  )
})
