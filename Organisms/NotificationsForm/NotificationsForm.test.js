import React from 'react'
import NotificationsForm from './NotificationsForm'

describe('NotificationsForm', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <NotificationsForm show={true} onClose={mockFun} onPause={mockFun} paused={false} onResume={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(
      <NotificationsForm show={false} onClose={mockFun} onPause={mockFun} paused={false} onResume={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
