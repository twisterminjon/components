import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import EventPendingCard from './EventPendingCard'

import { pendingEvents } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventPendingCard', () => {
    const loading = boolean('loading', false)

    const event = pendingEvents[0]

    return (
      <div style={{ width: '100%' }}>
        <EventPendingCard event={event} loading={loading} onClick={action('clicked')} />
      </div>
    )
  })
