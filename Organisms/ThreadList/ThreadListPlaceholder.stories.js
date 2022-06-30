import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import ThreadListPlaceholder from './ThreadListPlaceholder'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ThreadListPlaceholder', () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <ThreadListPlaceholder />
    </div>
  )
})
