import React from 'react'
import UserCardFavorite from './UserCardFavorite'

describe('UserCardFavorite', () => {
  const userName = 'Mung Bean'
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <UserCardFavorite
        useMenu={false}
        userName={userName}
        status="available"
        profileImage=""
        onCall={mockFun}
        onMessage={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with useMenu true', () => {
    const wrapper = window.shallow(
      <UserCardFavorite
        useMenu={true}
        userName={userName}
        status="available"
        profileImage=""
        onCall={mockFun}
        onMessage={mockFun}
        virtualCallsEnabled={true}
        disableMessages={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
