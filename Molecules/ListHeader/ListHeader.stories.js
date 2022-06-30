import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ListHeader from './ListHeader'
import { completedEventSent } from '../../../Mocks/Program.mock'
import EventCompletedCard from '../../Molecules/EventCard/EventCompletedCard'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('ListHeader', () => {
    const label = text('label', 'Completed')

    return (
      <div style={{ width: '100%' }}>
        <ListHeader label={label}>
          <EventCompletedCard event={completedEventSent} />
        </ListHeader>
      </div>
    )
  })
