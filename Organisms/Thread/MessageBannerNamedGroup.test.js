import React from 'react'

import MessageBannerNamedGroup from './MessageBannerNamedGroup'
import users from '../../../Mocks/Users.mock'

describe('MessageBannerNamedGroup', () => {
  const mockFun = jest.fn()

  it('matches the snapshot to allow calling', () => {
    const wrapper = window.shallow(<MessageBannerNamedGroup groupName="test" members={users} onAdd={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
