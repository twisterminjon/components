import React from 'react'

import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import UserAvatar from './UserAvatar'
import { USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_AWAY, USER_STATUS_OFFLINE } from '../../../constants'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)
stories.addDecorator(centered)

stories.add('UserAvatar', () => {
  const size = number('size', 32)

  const toShowProfileImage = boolean('profileImage', false)
  const profileImage = toShowProfileImage
    ? 'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg'
    : ''

  const statusOptions = {
    available: USER_STATUS_AVAILABLE,
    busy: USER_STATUS_BUSY,
    away: USER_STATUS_AWAY,
    offline: USER_STATUS_OFFLINE,
  }
  const status = select('status', statusOptions, USER_STATUS_AVAILABLE)

  return <UserAvatar size={size} profileImage={profileImage} status={status} />
})
