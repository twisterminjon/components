import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import EnrollProgramToast from './EnrollProgramToast'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('EnrollProgramToast', () => {
  const show = boolean('show', true)
  const program = {
    id: '1',
    name: 'New program',
  }
  return (
    <EnrollProgramToast
      show={show}
      program={program}
      onEnroll={action('complete clicked')}
      onClose={action('close clicked')}
    />
  )
})
