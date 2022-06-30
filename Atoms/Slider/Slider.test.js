import React from 'react'
import Slider from './Slider'

describe('Slider', () => {
  const mockFn = jest.fn()
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Slider min={0} max={100} onChange={mockFn} />)
    expect(wrapper).toMatchSnapshot()
  })
})
