import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

import NotificationPage from './NotificationPage'

const stories = storiesOf('Provider/v1/Views', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('NotificationPage', () => {
  const titleLab = 'title'
  const titleDef = 'What happened, thought you were l33t'
  const titleVal = text(titleLab, titleDef)

  const messageLab = 'message'
  const messageDef = 'Your kung foo, she not so good. You need to work on your 1337 h4xor skills dude!'
  const messageVal = text(messageLab, messageDef)

  const showDashboardLinkLab = 'showDashboardLink'
  const showDashboardLinkDef = true
  const showDashboardLinkVal = boolean(showDashboardLinkLab, showDashboardLinkDef)

  return <NotificationPage title={titleVal} message={messageVal} showDashboardLink={showDashboardLinkVal} />
})
