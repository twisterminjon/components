import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'

import NewMessagesPopup from './NewMessagesPopup'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)
stories.addDecorator(centered)

stories.add('NewMessagesPopup', () => {
  return (
    <NewMessagesPopup
      loading={boolean('loading', true)}
      visible={boolean('visible', true)}
      onClick={action('clicked')}
    />
  )
})
