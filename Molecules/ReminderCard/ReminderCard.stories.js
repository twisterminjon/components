import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import ReminderCard from './ReminderCard'
// import dayjs from 'dayjs'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ReminderCard', () => {
  const typeOpts = {
    visit: 'visit',
    careteam: 'careteam',
    message: 'message',
    survey: 'survey',
  }
  const typeVal = select('type', typeOpts, 'visit')

  const flagOpts = {
    none: 'none',
    warn: 'warn',
    expired: 'expired',
  }
  const flagVal = select('flagVal', flagOpts, 'none')

  const patientMayInitiate = boolean('patientMayInitiate', true)

  return (
    <ReminderCard
      type={typeVal}
      age={'1d ago'}
      flag={flagVal}
      message={''}
      patientMayInitiate={patientMayInitiate}
      onOpen={() => {
        alert('onOpen')
      }}
    />
  )
})
