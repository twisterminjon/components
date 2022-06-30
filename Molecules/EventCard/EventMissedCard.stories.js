import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import EventMissedCard from './EventMissedCard'

import { missedEvents } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventMissedCard', () => {
    const loading = boolean('loading', false)

    const event = missedEvents[0]

    return (
      <div style={{ width: '100%' }}>
        <EventMissedCard event={event} loading={loading} onClick={action('clicked')} />
      </div>
    )
  })
