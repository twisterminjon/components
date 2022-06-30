import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import VideoSmall from './VideoSmall'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoSmall', () => {
  return (
    <div style={{ backgroundColor: 'cornsilk', height: '100%', width: '100%' }}>
      <VideoSmall videoTrack={null} audioTrack={null} mirror={false} isLocal={false} />
    </div>
  )
})
