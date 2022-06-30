import React from 'react'

import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import NavbarButton from './NavbarButton'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)
stories.addDecorator(centered)

stories.add('NavbarButton', () => {
  const activeVal = boolean('active', false)

  const typeOpts = {
    home: 'home',
    staff: 'staff',
    patients: 'patients',
    message: 'message',
    calls: 'calls',
  }
  const typeVal = select('type', typeOpts, 'home')

  return (
    <div style={{ backgroundColor: 'white', height: '100%' }}>
      <NavbarButton type={typeVal} onClick={action('clicked')} active={activeVal} />
    </div>
  )
})
