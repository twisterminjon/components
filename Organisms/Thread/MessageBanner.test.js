import React from 'react'
import { currentUser } from '../../../Mocks/CurrentUser.mock'
import { CurrentUserContext } from '@shared/providers'
import MessageBanner from './MessageBanner'

describe('MessageBanner', () => {
  const mockFun = jest.fn()
  const userInBanner = {
    id: '1',
    displayName: 'test name',
    profileImage: 'https://www.fillmurray.com/200/200',
    overallStatus: 'available',
    isPatient: true,
  }

  it('matches the snapshot to allow calling', () => {
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser}>
        <MessageBanner
          userInBanner={userInBanner}
          avatarInteractive={true}
          canCall={true}
          canAddUser={true}
          onCall={mockFun}
          onSelectAvatar={mockFun}
          onAddUser={mockFun}
        />
      </CurrentUserContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/ calling off', () => {
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser}>
        <MessageBanner
          userInBanner={userInBanner}
          avatarInteractive={true}
          canAddUser={true}
          canCall={false}
          onCall={mockFun}
          onSelectAvatar={mockFun}
          onAddUser={mockFun}
        />
      </CurrentUserContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when avatar not interactive', () => {
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser}>
        <MessageBanner
          userInBanner={userInBanner}
          avatarInteractive={false}
          canAddUser={true}
          canCall={true}
          onCall={mockFun}
          onSelectAvatar={mockFun}
          onAddUser={mockFun}
        />
      </CurrentUserContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when users can not be added', () => {
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser}>
        <MessageBanner
          userInBanner={userInBanner}
          avatarInteractive={false}
          canAddUser={false}
          canCall={true}
          onCall={mockFun}
          onSelectAvatar={mockFun}
          onAddUser={mockFun}
        />
      </CurrentUserContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when user cannot access patient information', () => {
    let currentUser2 = currentUser
    currentUser2.permissions = [
      {
        id: '1',
        code: 'call_staff',
      },
    ]
    const wrapper = window.mount(
      <CurrentUserContext.Provider value={currentUser2}>
        <MessageBanner
          userInBanner={userInBanner}
          avatarInteractive={false}
          canAddUser={false}
          canCall={true}
          onCall={mockFun}
          onSelectAvatar={mockFun}
          onAddUser={mockFun}
        />
      </CurrentUserContext.Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
