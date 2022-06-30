import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import StatusBubbleOnline from './StatusBubbleOnline'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('StatusBubbleOnline', () => {
  const onlineLab = 'online'
  const onlineDef = true
  const onlineVal = boolean(onlineLab, onlineDef)

  const alwaysShowLab = 'alwaysShow'
  const alwaysShowDef = true
  const alwaysShowVal = boolean(alwaysShowLab, alwaysShowDef)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'olive',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBubbleOnline online={onlineVal} alwaysShow={alwaysShowVal} />
    </div>
  )
})
