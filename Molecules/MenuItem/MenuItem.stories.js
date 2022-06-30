import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MenuItem from './MenuItem'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('MenuItem', () => {
  const labelVal = text('label', 'Settings')
  const loadingVal = boolean('loading', false)
  const countVal = number('count', 0)

  return (
    <div style={{ width: '400px' }}>
      <MenuItem label={labelVal} count={countVal} onClick={action('onClick')} loading={loadingVal} />
    </div>
  )
})
