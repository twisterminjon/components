import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import VideoLarge from './VideoLarge'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('VideoLarge', () => {
  return (
    <VideoLarge
      participant="12a6hg78"
      videoMuteToggled={false}
      debugInfo={['trackChanged: a;dsl357', 'displayUpdated']}
    />
  )
})
