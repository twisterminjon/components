import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { VideoSmallPlaceholderView } from './VideoSmallPlaceholder'

const stories = storiesOf('Provider/v1/Molecules', module)

stories.addDecorator(withKnobs).add('VideoSmallPlaceholder', () => {
  const loadingVal = boolean('loading', false)
  const profileImageVal = text('profileImage', 'https://www.fillmurray.com/400/400')

  return (
    <div style={{ backgroundColor: 'cornsilk', height: '100%', width: '100%' }}>
      <VideoSmallPlaceholderView loading={loadingVal} profileImage={profileImageVal} />
    </div>
  )
})
