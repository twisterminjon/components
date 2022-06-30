import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { ProjectDate } from '@shared/helpers'
import { announcements } from '../../../Mocks/CurrentUser.mock'

import Announcement from './Announcement'

const stories = storiesOf('Provider/v1/Views', module)

stories.addDecorator(withKnobs).add('Announcement', () => {
  const loadingVal = boolean('loading', false)
  const removeLoadingVal = boolean('removeLoading', false)

  // We need to adjust the sentAt to be a 'display' time
  announcements.forEach(a => (a.time = ProjectDate(a.sentAt).formatFriendly()))

  return (
    <Announcement
      loading={loadingVal}
      removeLoading={removeLoadingVal}
      announcement={announcements[2]}
      onRemove={action('onRemove')}
      onClose={action('onClose')}
    />
  )
})
