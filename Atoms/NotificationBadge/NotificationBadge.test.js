import React from 'react'
import NotificationBadge from './NotificationBadge'

describe('NotificationBadge', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<NotificationBadge count={12} />)
    expect(wrapper).toMatchSnapshot()
  })
})
