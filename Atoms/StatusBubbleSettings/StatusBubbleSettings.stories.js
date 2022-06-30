import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import StatusBubbleSettings from './StatusBubbleSettings'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Atoms', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('StatusBubbleSettings', () => {
    const statusOpts = {
      available: USER_STATUS_AVAILABLE,
      busy: USER_STATUS_BUSY,
      away: USER_STATUS_AWAY,
      offline: USER_STATUS_OFFLINE,
    }
    const statusVal = select('status', statusOpts, USER_STATUS_AVAILABLE)

    return <StatusBubbleSettings status={statusVal} />
  })
