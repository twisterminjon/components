import React from 'react'
import NotificationsPauseToast from './NotificationsPauseToast'

describe('NotificationsPauseToast', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<NotificationsPauseToast show={true} onPause={mockFun} onCancel={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(<NotificationsPauseToast show={false} onPause={mockFun} onCancel={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
