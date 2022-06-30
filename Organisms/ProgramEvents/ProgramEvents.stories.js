import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'

import ProgramEvents from './ProgramEvents'
import { events } from '../../../Mocks/Program.mock'

storiesOf('Provider/v1/Organisms', module)
  .addDecorator(withKnobs)
  .add('ProgramEvents', () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ProgramEvents
          events={events}
          onReschedule={action('clicked save')}
          onMarkComplete={action('clicked complete')}
          timezone={text('timezone', 'America/New_York')}
        />
      </div>
    )
  })
