import React from 'react'
import LogoBar from './LogoBar'

describe('LogoBar', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<LogoBar onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })
})
