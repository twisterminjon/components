import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'

import AccordionTab from './AccordionTab'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('AccordionTab', () => {
  const labelVal = text('label', 'Rebels')
  const invertedVal = boolean('inverted', false)
  const directionOpts = {
    up: 'up',
    right: 'right',
    down: 'down',
    left: 'left',
  }
  const directionVal = select('direction', directionOpts, 'right')

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        left: 0,
      }}>
      <AccordionTab
        label={labelVal}
        inverted={invertedVal}
        direction={directionVal}
        onActivate={() => alert('onActivate')}
      />
    </div>
  )
})
