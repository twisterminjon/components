import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import ThreadListCardPlaceholder from './ThreadListCardPlaceholder'

const stories = storiesOf('Provider/v1/Organisms/ThreadList', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ThreadListCardPlaceholder', () => {
  const delayLabel = 'delay'
  const delayDef = 0
  const delayVal = number(delayLabel, delayDef)

  return (
    <div
      style={{
        width: 320,
      }}>
      <ThreadListCardPlaceholder delay={delayVal} />
    </div>
  )
})
