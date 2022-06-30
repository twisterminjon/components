import React from 'react'
import GroupHeader from './GroupHeader'

describe('GroupHeader', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<GroupHeader name="Rheumatism therapy" onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })
})
