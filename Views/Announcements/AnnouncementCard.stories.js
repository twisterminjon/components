import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import CenterView from '../../../storybookUtils/CenterView'

import Stack from '../../Atoms/Stack/Stack'
import { announcements } from '../../../Mocks/CurrentUser.mock'

import AnnouncementCard from './AnnouncementCard'

const stories = storiesOf('Provider/v1/Views', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(getStories => <CenterView inverted>{getStories()}</CenterView>)
  .add('AnnouncementCard', () => {
    const loadingVal = boolean('loading', false)
    const timeVal = text('timestamp', '2mins ago')
    const contentVal = text('content', announcements[0].textSnippet)
    const readVal = boolean('read', false)

    return (
      <Stack>
        <AnnouncementCard
          loading={loadingVal}
          time={timeVal}
          content={contentVal}
          read={readVal}
          onView={action('onView')}
          onClose={action('onClose')}
        />
        <AnnouncementCard
          time={timeVal}
          content={contentVal}
          read={true}
          onView={action('onView')}
          onClose={action('onClose')}
        />
      </Stack>
    )
  })
