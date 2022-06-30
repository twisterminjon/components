import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import UserCardCaregiverPlaceholder from './UserCardCaregiverPlaceholder'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('UserCardCaregiverPlaceholder', () => {
  const countLab = 'count'
  const countDef = 5
  const countVal = number(countLab, countDef)

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
      <UserCardCaregiverPlaceholder count={countVal} />
    </div>
  )
})
