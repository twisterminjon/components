import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import EventsPendingList from './EventsPendingList'
import { pendingEvents } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventsPendingList', () => {
    return (
      <div style={{ width: '100%' }}>
        <EventsPendingList
          events={pendingEvents}
          onClick={event => action(`clicked event ${event.id}`)()}
          loadingEvents={[]}
        />
      </div>
    )
  })
