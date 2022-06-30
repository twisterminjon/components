import React from 'react'

import ThreadAddUser from './ThreadAddUser'
import thread from '../../../Mocks/Thread.mock'

describe('ThreadAddUser', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ThreadAddUser
        users={thread.addMembers}
        onShowGroups={mockFun}
        onAddUser={mockFun}
        onBack={mockFun}
        onSearchChange={mockFun}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <ThreadAddUser
        users={thread.addMembers}
        onShowGroups={mockFun}
        onAddUser={mockFun}
        onBack={mockFun}
        onSearchChange={mockFun}
        loading={true}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
