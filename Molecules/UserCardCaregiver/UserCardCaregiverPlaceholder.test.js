import React from 'react'
import UserCardCaregiverPlaceholder from './UserCardCaregiverPlaceholder'

describe('UserCardCaregiverPlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<UserCardCaregiverPlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
