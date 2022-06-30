import React from 'react'
import UserCardSimple from './UserCardSimple'

describe('UserCardSimple', () => {
  const userName = 'Mung Bean'
  const profileImage = 'http://some.url.com/picture'
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <UserCardSimple userName={userName} profileImage={profileImage} onClick={mockFun} status="available" />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
