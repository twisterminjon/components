import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import CaregiverSearchNotFound from './CaregiverSearchNotFound'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.add('CaregiverSearchNotFound', () => {
  return (
    <CaregiverSearchNotFound
      onAdd={() => {
        alert('Adding stuff')
      }}
    />
  )
})
