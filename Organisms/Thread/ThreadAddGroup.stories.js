import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'

import ThreadAddGroup from './ThreadAddGroup'
import thread from '../../../Mocks/Thread.mock'

const stories = storiesOf('Provider/v1/Organisms/MessageThread', module)
stories.addDecorator(withKnobs)

stories.addDecorator(StoryRouter()).add('ThreadAddGroup', () => {
  return (
    <ThreadAddGroup
      onAddUser={() => {
        alert('onAddUser')
      }}
      onBack={() => {
        alert('onBack')
      }}
      onExpandedGroupIdChange={expandedGroupId => alert(`onExpandedGroupIdChange(${expandedGroupId})`)}
      groups={thread.addGroups}
      groupsLoading={boolean('groupsLoading', false)}
      groupsPageNumber={number('groupsPageNumber', 0)}
      onGroupsPageNumberChange={pageNumber => alert(`onGroupsPageNumberChange(${pageNumber})`)}
      groupUsers={thread.addGroupUsers}
      groupUsersLoading={boolean('groupUsersLoading', false)}
      groupUsersPageNumber={number('groupUsersPageNumber', 0)}
      onGroupUsersPageNumberChange={pageNumber => alert(`onGroupUsersPageNumberChange(${pageNumber})`)}
    />
  )
})
