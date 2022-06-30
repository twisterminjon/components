import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import EventsCompletedList from './EventsCompletedList'

import { completedEvents } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventsCompletedList', () => {
    return (
      <div style={{ width: '100%' }}>
        <EventsCompletedList events={completedEvents} />
      </div>
    )
  })
