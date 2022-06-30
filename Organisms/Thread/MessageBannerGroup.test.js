import React from 'react'

import MessageBannerGroup from './MessageBannerGroup'

describe('MessageBannerGroup', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MessageBannerGroup name="test" onAdd={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
