import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import CallCompletedNotice from './CallCompletedNotice'

const stories = storiesOf('Provider/v1/Molecules/CallNotices', module)
stories.addDecorator(withKnobs)

stories.add('CallCompletedNotice', () => {
  const showLabel = 'show'
  const showDefault = true
  const showValue = boolean(showLabel, showDefault)

  return (
    <div
      style={{
        backgroundImage: 'url("https://picsum.photos/500/500/?random")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <CallCompletedNotice
        show={showValue}
        onCancel={() => {
          alert('cancel clicked')
        }}
      />
    </div>
  )
})
