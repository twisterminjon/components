import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import EventCompletedCard from './EventCompletedCard'

import { completedEventSent, completedEventChecked, completedEventOpened } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventCompletedCard', () => {
    const options = {
      sent: 'sent',
      checked: 'checked',
      opened: 'opened',
    }
    const event = select('event', options, 'sent')

    const events = {
      sent: completedEventSent,
      checked: completedEventChecked,
      opened: completedEventOpened,
    }
    return (
      <div style={{ width: '100%' }}>
        <EventCompletedCard event={events[event]} />
      </div>
    )
  })
