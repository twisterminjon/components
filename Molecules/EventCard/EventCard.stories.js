import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import IconCheckSmall from '../../Atoms/Icons/IconCheckSmall'

import EventCard from './EventCard'

storiesOf('Provider/v1/Molecules', module)
  .addDecorator(withKnobs)
  .add('EventCard', () => {
    const loading = boolean('loading', false)
    const label = text('label', 'Label')
    const date = text('date', '12/11/2019')

    return (
      <div style={{ width: '100%' }}>
        <EventCard
          label={label}
          date={date}
          renderIcon={() => <IconCheckSmall />}
          onClick={action('clicked')}
          wrapeprClassName=""
          textClassName=""
          loading={loading}
        />
      </div>
    )
  })
