import React from 'react'
import TNDecline from './TNDecline'

describe('TNDecline', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrap = window.shallow(<TNDecline onReturn={mockFun} onCloseApp={mockFun} />)
    expect(wrap).toMatchSnapshot()
  })
})
