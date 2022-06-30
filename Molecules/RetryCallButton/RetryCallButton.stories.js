import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import RetryCallButton from './RetryCallButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('RetryCallButton', () => {
  const showLabelLabel = 'showLabel'
  const showLabelDefault = true
  const showLabelValue = boolean(showLabelLabel, showLabelDefault)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RetryCallButton showLabel={showLabelValue} />
    </div>
  )
})
