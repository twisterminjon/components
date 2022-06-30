import React from 'react'
import GroupFooter from './GroupFooter'

describe('GroupFooter', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<GroupFooter disabled={false} onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })
})
