import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import LogoBar from './LogoBar'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('LogoBar', () => {
  const picLabel = 'Show image'
  const picDefaultValue = true
  const picValue = boolean(picLabel, picDefaultValue)

  const picSource = picValue ? 'https://www.fillmurray.com/600/200' : ''

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'cornsilk',
      }}>
      <LogoBar enterpriseLogo={picSource} />
    </div>
  )
})
