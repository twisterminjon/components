import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import UpdatePhoneForm from './UpdatePhoneForm'

const stories = storiesOf('Provider/v1/Organisms', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add('UpdatePhoneForm', () => {
    const showVal = boolean('show', true)
    const mutationLoadingVal = boolean('mutationLoading', false)
    const phoneLoadingVal = boolean('phoneLoading', false)
    const phoneVal = text('phone', '+17272622331')

    return (
      <UpdatePhoneForm
        show={showVal}
        onClose={action('Close')}
        currentPhone={phoneVal}
        updateLoading={mutationLoadingVal}
        phoneLoading={phoneLoadingVal}
        onUpdatePhone={action('Update Phone')}
        updateError={''}
      />
    )
  })
