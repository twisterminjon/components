import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Thread from './Thread'
import ThreadPlaceholder from './ThreadPlaceholder'
import thread from '../../../Mocks/Thread.mock'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('Thread', () => {
  const placeholderVal = boolean('Show Placeholder', false)
  const message = text('message', 'Some message')
  const loadingVal = boolean('loading', false)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      {placeholderVal ? (
        <ThreadPlaceholder />
      ) : (
        <Thread
          thread={thread}
          message={message}
          setMessage={action('setMessage')}
          onSend={action('onSend')}
          onRetry={action('onRetry')}
          fetchMore={action('fetchMore')}
          onDownloadAttachment={action('onDownloadAttachment')}
          loading={loadingVal}
        />
      )}
    </div>
  )
})
