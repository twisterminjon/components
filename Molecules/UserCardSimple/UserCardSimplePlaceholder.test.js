import React from 'react'
import UserCardSimplePlaceholder from './UserCardSimplePlaceholder'

describe('UserCardSimplePlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserCardSimplePlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
