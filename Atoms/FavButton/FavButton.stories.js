import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import FavButton from './FavButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('FavButton', () => {
  const filledLabel = 'filled'
  const filledDefault = false
  const filledValue = boolean(filledLabel, filledDefault)

  return (
    <div
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#002862',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FavButton
        filled={filledValue}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  )
})
