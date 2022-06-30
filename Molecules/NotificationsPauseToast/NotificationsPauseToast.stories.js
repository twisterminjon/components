import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import NotificationsPauseToast from './NotificationsPauseToast'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('NotificationsPauseToast', () => {
  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const defaultStartDateTimeValue = text('defaultStartDateTimeValue', '2020-03-04T07:45')
  const defaultEndDateTimeValue = text('defaultEndDateTimeValue', '2020-03-04T09:45')

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <NotificationsPauseToast
        show={showValue}
        onCancel={() => alert('onCancel')}
        onPause={({ startDateTime, endDateTime }) => alert(`Paused from ${startDateTime} to ${endDateTime}`)}
        defaultStartDateTime={defaultStartDateTimeValue}
        defaultEndDateTime={defaultEndDateTimeValue}
      />
    </div>
  )
})
