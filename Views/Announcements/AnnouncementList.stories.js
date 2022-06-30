import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { announcements } from '../../../Mocks/CurrentUser.mock'
import { ProjectDate } from '@shared/helpers'

import AnnouncementList from './AnnouncementList'

const stories = storiesOf('Provider/v1/Views', module)

stories.addDecorator(withKnobs).add('AnnouncementList', () => {
  const loadingVal = boolean('loading', false)

  // We need to adjust the sentAt to be a 'display' time
  announcements.forEach(a => (a.time = ProjectDate(a.sentAt).formatFriendly()))

  return (
    <AnnouncementList
      loading={loadingVal}
      list={announcements}
      onView={action('onView')}
      onRemove={action('onRemove')}
      onClose={action('onClose')}
    />
  )
})
