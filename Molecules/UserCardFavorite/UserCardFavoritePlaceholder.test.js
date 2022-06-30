import React from 'react'
import UserCardFavoritePlaceholder from './UserCardFavoritePlaceholder'

describe('UserCardFavoritePlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserCardFavoritePlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
