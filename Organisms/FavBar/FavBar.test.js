import React from 'react'
import FavBar from './FavBar'

describe('FavBar', () => {
  const mockFun = jest.fn()
  const users = [
    {
      id: '123',
      displayName: 'Dr. Stephen Strange',
      profileImage: 'https://www.fillmurray.com/60/60',
      overallStatus: 'available',
    },

    {
      id: '4',
      displayName: 'Nurse Jacky',
      profileImage: 'https://www.fillmurray.com/100/100',
      overallStatus: 'busy',
    },
  ]

  const noUsers = []

  it('matches the snapshot with users', () => {
    const wrapper = window.shallow(
      <FavBar users={users} loading={false} messagesEnabled={false} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with messages enabled', () => {
    const wrapper = window.shallow(
      <FavBar users={users} loading={false} messagesEnabled={true} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with NO users', () => {
    const wrapper = window.shallow(
      <FavBar users={noUsers} loading={false} messagesEnabled={false} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <FavBar users={users} loading={true} messagesEnabled={false} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
