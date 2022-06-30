import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import MuteVideoButton from './MuteVideoButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MuteVideoButton', () => {
  const showLabelLabel = 'showLabel'
  const showLabelDefault = true
  const showLabelValue = boolean(showLabelLabel, showLabelDefault)

  const muteLabel = 'muted'
  const muteDefault = true
  const muteValue = boolean(muteLabel, muteDefault)

  return (
    <MuteVideoButton
      showLabel={showLabelValue}
      muted={muteValue}
      onClick={() => {
        alert('clicked')
      }}
    />
  )
})
