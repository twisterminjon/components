import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import PatientListHeader from './PatientListHeader'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientListHeader', () => {
  const nameVal = text('title', 'Enterprise - Parent Organization')

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        width: '300px',
      }}>
      <PatientListHeader showSelect={() => alert('Open select pane')} title={nameVal} />
    </div>
  )
})
