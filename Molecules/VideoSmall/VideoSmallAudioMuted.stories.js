import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import VideoSmallAudioMuted from './VideoSmallAudioMuted'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoSmallAudioMuted', () => {
  return (
    <div style={{ backgroundColor: 'cornsilk', height: '100%', width: '100%' }}>
      <VideoSmallAudioMuted />
    </div>
  )
})
