import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import NotificationsForm from './NotificationsForm'

const stories = storiesOf('Provider/v1/Organisms', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('NotificationsForm', () => {
  const showLabel = 'show'
  const showDefaultValue = true
  const showValue = boolean(showLabel, showDefaultValue)

  const pausedLabel = 'paused'
  const pausedDefaultValue = false
  const pausedValue = boolean(pausedLabel, pausedDefaultValue)

  const scheduledLabel = 'scheduled'
  const scheduledDefaultValue = false
  const scheduledValue = boolean(scheduledLabel, scheduledDefaultValue)

  const defaultPauseStartDateTimeValue = text('defaultPauseStartDateTimeValue', '2020-03-04T07:45')
  const defaultPauseEndDateTimeValue = text('defaultPauseEndDateTimeValue', '2020-03-04T09:45')

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
      <NotificationsForm
        show={showValue}
        paused={pausedValue}
        onPause={({ startDateTime, endDateTime }) => alert(`Paused from ${startDateTime} to ${endDateTime}`)}
        onResume={() => alert('onResume')}
        onClose={() => alert('onClose')}
        defaultPauseStartDateTime={defaultPauseStartDateTimeValue}
        defaultPauseEndDateTime={defaultPauseEndDateTimeValue}
        scheduled={scheduledValue}
      />
    </div>
  )
})
