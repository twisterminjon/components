import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import Dimmer from './Dimmer'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.add('Dimmer', () => {
  const showLab = 'show'
  const showDef = true
  const showVal = boolean(showLab, showDef)

  const backgroundColorLab = 'backgroundColor'
  const backgroundColorOpts = {
    black: 'black',
    positive: 'positive',
    negative: 'negative',
  }
  const backgroundColorDef = 'positive'
  const backgroundColorVal = select(backgroundColorLab, backgroundColorOpts, backgroundColorDef)

  return (
    <div
      style={{
        backgroundImage: 'url("https://picsum.photos/500/500/?random")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <Dimmer show={showVal} backgroundColor={backgroundColorVal} />
    </div>
  )
})
