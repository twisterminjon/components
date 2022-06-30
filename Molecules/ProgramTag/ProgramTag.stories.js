import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/react'

import ProgramTag from './ProgramTag'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('ProgramTag', () => {
  const label = text('label', 'D-list super heros')
  const inActive = boolean('inActive', false)
  const loading = boolean('loading', false)
  const isComplete = boolean('isComplete', false)

  return (
    <ProgramTag
      label={label}
      id="1"
      enrollmentId="11"
      inActive={inActive}
      onEdit={(enrollmentId, id, name) => {
        alert(`edit tag enrollmentId: ${enrollmentId}, id: ${id}, name: ${name}`)
      }}
      loading={loading}
      isComplete={isComplete}
    />
  )
})
