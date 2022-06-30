import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import SkipCallButton from './SkipCallButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('SkipCallButton', () => {
  const ghostLabel = 'ghost'
  const ghostDefault = false
  const ghostValue = boolean(ghostLabel, ghostDefault)

  return <SkipCallButton ghost={ghostValue} />
})
