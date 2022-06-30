import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import EventsMissedList from './EventsMissedList'
import { missedEvents } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventsMissedList', () => {
    return (
      <div style={{ width: '100%' }}>
        <EventsMissedList
          events={missedEvents}
          onClick={event => action(`clicked event ${event.id}`)()}
          loadingEvents={[]}
        />
      </div>
    )
  })
