import React from 'react'
import IconDeclineCall from '../../Atoms/Icons/IconDeclineCall'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import CallButton from './CallButton'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('CallButton', () => {
  const ghostLabel = 'ghost'
  const ghostDefault = false
  const ghostValue = boolean(ghostLabel, ghostDefault)

  const disabledLabel = 'disabled'
  const disabledDefault = false
  const disabledValue = boolean(disabledLabel, disabledDefault)

  const dimmedLabel = 'dimmed'
  const dimmedDefault = false
  const dimmedValue = boolean(dimmedLabel, dimmedDefault)

  const sizeLabel = 'Size'
  const options = {
    small: 'small',
    medium: 'medium',
  }
  const defaultValue = 'medium'
  const value = select(sizeLabel, options, defaultValue)

  return (
    <CallButton
      ghost={ghostValue}
      name="story"
      color="#ff4d4d"
      size={value}
      disabled={disabledValue}
      onClick={() => {
        alert('clicked')
      }}
      dimmed={dimmedValue}>
      <IconDeclineCall />
    </CallButton>
  )
})
