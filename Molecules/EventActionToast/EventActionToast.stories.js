import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import EventActionToast from './EventActionToast'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)

stories.add('EventActionToast', () => {
  const show = boolean('show', true)
  const date = text('date', '2019-12-11')
  const timezone = text('timezone', 'America/New_York')
  const isReschedulable = boolean('isReschedulable', true)

  return (
    <EventActionToast
      show={show}
      date={date}
      isReschedulable={isReschedulable}
      onComplete={action('complete clicked')}
      onSave={date => action(`save clicked, date: ${date}`)()}
      onCancel={action('cancel clicked')}
      timezone={timezone}
    />
  )
})
