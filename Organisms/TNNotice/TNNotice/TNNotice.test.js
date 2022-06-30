import React from 'react'
import TNNotice from './TNNotice'

describe('TNNotice', () => {
  const mockFun = jest.fn()

  it('matches the snapshot when should welcome', () => {
    const wrap = window.shallow(<TNNotice type="welcome" onContinue={mockFun} />)
    expect(wrap).toMatchSnapshot()
  })

  it('matches the snapshot when terms & notices are updated', () => {
    const wrap = window.shallow(<TNNotice type="update" onContinue={mockFun} />)
    expect(wrap).toMatchSnapshot()
  })
})
