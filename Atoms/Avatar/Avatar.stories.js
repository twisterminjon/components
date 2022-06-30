import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'

import Avatar from './Avatar'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('Avatar', () => {
  const loadingVal = boolean('loading', false)
  const sizeVal = number('size', 100)
  const textVal = text('text', 'Korben Dallas')
  const picVal = boolean('Show picture', true)
  const dimmedVal = boolean('dimmed', false)

  const picSource = picVal ? 'https://www.fillmurray.com/400/400' : ''

  return (
    <div
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Avatar loading={loadingVal} name={textVal} size={sizeVal} imgUrl={picSource} dimmed={dimmedVal} />
    </div>
  )
})
