import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import AnnouncementBanner from './AnnouncementBanner'

const stories = storiesOf('Provider/v1/Views', module)

stories.addDecorator(withKnobs).add('AnnouncementBanner', () => {
  const textVal = text('text', 'Announcements')

  return <AnnouncementBanner text={textVal} />
})
