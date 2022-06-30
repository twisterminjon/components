import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'

import PatientListPlaceholder from './PatientListPlaceholder'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientListPlaceholder', () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#001432',
      }}>
      <PatientListPlaceholder />
    </div>
  )
})
