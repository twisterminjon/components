import React from 'react'
import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import UserAvatarMe from './UserAvatarMe'
import { USER_STATUS_AVAILABLE } from '../../../constants'

const stories = storiesOf('Provider/v1/Molecules', module)
stories.addDecorator(withKnobs)
stories.addDecorator(centered)

stories.add('UserAvatarMe', () => {
  const notificationsPausedVal = boolean('notificationsPaused', false)

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '300px',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <UserAvatarMe
        profileImage={'https://www.fillmurray.com/300/300'}
        status={USER_STATUS_AVAILABLE}
        notificationsPaused={notificationsPausedVal}
      />
    </div>
  )
})
