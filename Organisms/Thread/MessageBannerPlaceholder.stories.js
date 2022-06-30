import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import MessageBannerPlaceholder from './MessageBannerPlaceholder'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)

stories.add('MessageBannerPlaceholder', () => {
  return <MessageBannerPlaceholder />
})
