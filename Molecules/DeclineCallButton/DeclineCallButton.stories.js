import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import DeclineCallButton from './DeclineCallButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('DeclineCallButton', () => {
  const ghostLabel = 'ghost'
  const ghostDefault = false
  const ghostValue = boolean(ghostLabel, ghostDefault)

  const showLabelLabel = 'showLabel'
  const showLabelDefault = true
  const showLabelValue = boolean(showLabelLabel, showLabelDefault)

  return (
    <DeclineCallButton
      ghost={ghostValue}
      showLabel={showLabelValue}
      onClick={() => {
        alert('clicked')
      }}
    />
  )
})
