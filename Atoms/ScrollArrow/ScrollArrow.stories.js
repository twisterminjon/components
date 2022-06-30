import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import ScrollArrow from './ScrollArrow'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ScrollArrow', () => {
  const directionLabel = 'direction'
  const directionOptions = {
    left: 'left',
    right: 'right',
  }
  const directionDefaultValue = 'left'
  const directionValue = select(directionLabel, directionOptions, directionDefaultValue)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollArrow
        direction={directionValue}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  )
})
