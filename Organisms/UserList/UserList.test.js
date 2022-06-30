import React from 'react'
import UserList from './UserList'

describe('UserList', () => {
  const mockFun = jest.fn()
  let users = [
    {
      id: '123',
      displayName: 'Dr. Stephen Strange',
      profileImage: 'https://www.someurl.com/somepic',
      overallStatus: 'available',
      favorite: false,
    },

    {
      id: '4',
      displayName: 'Nurse Jacky',
      profileImage: 'https://www.someurl.com/someotherpic',
      overallStatus: 'busy',
      favorite: false,
    },
    {
      id: '4',
      displayName: 'Dr. X',
      profileImage: 'https://www.someurl.com/someotherpic',
      overallStatus: 'offline',
      favorite: true,
    },
  ]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserList userList={users} onCall={mockFun} canMessage={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/o message perms', () => {
    const wrapper = window.shallow(<UserList userList={users} onCall={mockFun} canMessage={false} />)
    expect(wrapper).toMatchSnapshot()
  })
})
