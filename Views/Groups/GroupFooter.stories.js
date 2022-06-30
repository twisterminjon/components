import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import GroupFooter from './GroupFooter'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('GroupFooter', () => {
  const disabled = boolean('disabled', false)

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
      <GroupFooter
        disabled={disabled}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  )
})
