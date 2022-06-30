import React from 'react'
import GroupDisplayEmpty from './GroupDisplayEmpty'

describe('GroupDisplayEmpty', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<GroupDisplayEmpty name="The BeeGees" onGoBack={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
