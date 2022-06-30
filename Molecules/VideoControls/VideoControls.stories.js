import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import VideoControls from './VideoControls'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoControls', () => {
  const showLabel = 'Show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const audioMutedLabel = 'audioMuted'
  const audioMutedDefaultValue = false
  const audioMutedValue = boolean(audioMutedLabel, audioMutedDefaultValue)

  const videoMutedLabel = 'videoMuted'
  const videoMutedDefaultValue = false
  const videoMutedValue = boolean(videoMutedLabel, videoMutedDefaultValue)

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
      <VideoControls
        show={showValue}
        audioMuted={audioMutedValue}
        videoMuted={videoMutedValue}
        onHangup={() => {
          alert('hangup click')
        }}
        onMuteAudio={() => {
          alert('audio muted')
        }}
        onMuteVideo={() => {
          alert('video muted')
        }}
      />
    </div>
  )
})
