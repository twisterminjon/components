import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import PatientCard from './PatientCard'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.addDecorator(centered).add('PatientCard', () => {
  const textLabel = 'userName'
  const textDefaultValue = 'Dr. Strange'
  const textValue = text(textLabel, textDefaultValue)

  const picLabel = 'Show picture'
  const picDefaultValue = true
  const picValue = boolean(picLabel, picDefaultValue)
  const picSource = picValue ? 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg' : ''

  const statusLabel = 'Status'
  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const statusDefaultValue = USER_STATUS_AVAILABLE
  const statusValue = select(statusLabel, statusOptions, statusDefaultValue)

  const sizeLabel = 'size'
  const sizeOptions = {
    small: 'small',
    medium: 'medium',
  }
  const sizeDefaultValue = 'medium'
  const sizeValue = select(sizeLabel, sizeOptions, sizeDefaultValue)

  const showDnc = true

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
      }}>
      <PatientCard
        userName={textValue}
        profileImage={picSource}
        size={sizeValue}
        onClick={() => {
          alert('clicked')
        }}
        status={statusValue}
        showDnc={showDnc}
      />
    </div>
  )
})
