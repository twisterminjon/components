import React from 'react'
import UserCardCallPlaceholder from './UserCardCallPlaceholder'

describe('UserCardCallPlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserCardCallPlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
