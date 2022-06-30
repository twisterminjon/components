import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import MessageBannerNamedGroup from './MessageBannerNamedGroup'
import users from '../../../Mocks/Users.mock'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)

stories.addDecorator(withKnobs).add('MessageBannerNamedGroup', () => {
  const groupNameVal = text('groupName', 'Lions and Tigers and Bears oh my!')
  const canModifyMembers = boolean('canModifyMembers', true)

  return (
    <MessageBannerNamedGroup
      canModifyMembers={canModifyMembers}
      groupName={groupNameVal}
      members={users}
      onAdd={action('onAdd')}
    />
  )
})
