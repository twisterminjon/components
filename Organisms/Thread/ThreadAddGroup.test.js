import React from 'react'

import ThreadAddGroup from './ThreadAddGroup'
import thread from '../../../Mocks/Thread.mock'

describe('ThreadAddGroup', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ThreadAddGroup
        onAddUser={mockFun}
        onBack={mockFun}
        onExpandedGroupIdChange={mockFun}
        groups={thread.addGroups}
        groupsLoading={false}
        groupsPageNumber={0}
        onGroupsPageNumberChange={mockFun}
        groupUsers={thread.addGroupUsers}
        groupUsersLoading={false}
        groupUsersPageNumber={0}
        onGroupUsersPageNumberChange={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when groups are loading', () => {
    const wrapper = window.shallow(
      <ThreadAddGroup
        onAddUser={mockFun}
        onBack={mockFun}
        onExpandedGroupIdChange={mockFun}
        groups={thread.addGroups}
        groupsLoading={true}
        groupsPageNumber={0}
        onGroupsPageNumberChange={mockFun}
        groupUsers={thread.addGroupUsers}
        groupUsersLoading={false}
        groupUsersPageNumber={0}
        onGroupUsersPageNumberChange={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when group users are loading', () => {
    const wrapper = window.shallow(
      <ThreadAddGroup
        onAddUser={mockFun}
        onBack={mockFun}
        onExpandedGroupIdChange={mockFun}
        groups={thread.addGroups}
        groupsLoading={false}
        groupsPageNumber={0}
        onGroupsPageNumberChange={mockFun}
        groupUsers={thread.addGroupUsers}
        groupUsersLoading={true}
        groupUsersPageNumber={0}
        onGroupUsersPageNumberChange={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
