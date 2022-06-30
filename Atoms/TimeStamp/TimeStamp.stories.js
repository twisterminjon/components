import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import TimeStamp from './TimeStamp'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('TimeStamp', () => {
  const timestampLabel = 'timestamp'
  const timestampDefault = '2018-12-05T10:30:15'
  const timestamp = text(timestampLabel, timestampDefault)

  return (
    <div
      style={{
        width: 200,
      }}>
      <TimeStamp timestamp={timestamp} />
    </div>
  )
})
