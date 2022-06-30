import React from 'react'
import ScrollArrow from './ScrollArrow'

describe('ScrollArrow', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot with the left arrow', () => {
    const wrapper = window.shallow(<ScrollArrow onClick={mockFunction} direction="left" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with the right arrow', () => {
    const wrapper = window.shallow(<ScrollArrow onClick={mockFunction} direction="right" />)
    expect(wrapper).toMatchSnapshot()
  })
})
