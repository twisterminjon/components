import React from 'react'
import UserCardCall from './UserCardCall'

describe('UserCardCall', () => {
  const id = '1'
  const userName = 'Mung Bean'
  const profileImage = 'http://some.url.com/picture'
  const favorite = false
  const status = 'available'
  const mockFun = jest.fn()

  it('matches the snapshot with just call button', () => {
    const wrapper = window.shallow(
      <UserCardCall
        canMessage={false}
        canCall={true}
        userId={id}
        displayName={userName}
        profileImage={profileImage}
        favorite={favorite}
        status={status}
        onCall={mockFun}
        onMessage={mockFun}
        onFavoriteClick={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with just the message button', () => {
    const wrapper = window.shallow(
      <UserCardCall
        canMessage={true}
        canCall={false}
        userId={id}
        displayName={userName}
        profileImage={profileImage}
        favorite={favorite}
        status={status}
        onCall={mockFun}
        onMessage={mockFun}
        onFavoriteClick={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
