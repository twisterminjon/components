import React from 'react'
import TNDisplay from './TNDisplay'

describe('TNDisplay', () => {
  const mockFun = jest.fn()

  it('matches the snapshot when would be shown on welcome/update', () => {
    const wrap = window.shallow(
      <TNDisplay type="agree" text="Terms & Notices text" onAgree={mockFun} onDisagree={mockFun} />
    )
    expect(wrap).toMatchSnapshot()
  })

  it('matches the snapshot when would be shown on menu', () => {
    const wrap = window.shallow(
      <TNDisplay type="opt-out" text="Terms & Notices text" onAgree={mockFun} onDisagree={mockFun} />
    )
    expect(wrap).toMatchSnapshot()
  })
})
