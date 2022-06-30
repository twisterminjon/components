import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import GroupHeader from './GroupHeader'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('GroupHeader', () => {
  const name = text('name', 'Tuberculosis Ward')
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'cornsilk',
      }}>
      <GroupHeader
        name={name}
        onClick={() => {
          alert('back button clicked')
        }}
      />
    </div>
  )
})
