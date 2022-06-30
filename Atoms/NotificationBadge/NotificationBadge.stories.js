import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import NotificationBadge from './NotificationBadge'

const stories = storiesOf('Provider/v1/Atoms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('NotificationBadge', () => {
  const countLabel = 'count'
  const countDefaultValue = 23
  const countValue = number(countLabel, countDefaultValue)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'olive',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <NotificationBadge count={countValue} />
    </div>
  )
})
