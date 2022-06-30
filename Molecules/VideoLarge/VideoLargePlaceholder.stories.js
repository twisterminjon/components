import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { VideoLargePlaceholderView } from './VideoLargePlaceholder'

const stories = storiesOf('Provider/v1/Molecules', module)

stories.addDecorator(withKnobs).add('VideoLargePlaceholder', () => {
  const loadingVal = boolean('loading', false)
  const profileImageVal = text('profileImage', 'https://www.fillmurray.com/400/400')

  return (
    <div style={{ backgroundColor: 'cornsilk', height: '100%', width: '100%' }}>
      <VideoLargePlaceholderView loading={loadingVal} profileImage={profileImageVal} />
    </div>
  )
})
