import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import DialButton from './DialButton'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('DialButton', () => {
  const statusLabel = 'Size'
  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const statusDefaultValue = USER_STATUS_AVAILABLE
  const statusValue = select(statusLabel, statusOptions, statusDefaultValue)

  const dimmedLab = 'dimmed'
  const dimmedDef = false
  const dimmedVal = boolean(dimmedLab, dimmedDef)

  return (
    <DialButton
      onClick={() => {
        alert('clicked')
      }}
      dimmed={dimmedVal}
      status={statusValue}
    />
  )
})
