import React from 'react'
import TextButton from './TextButton'

describe('TextButton', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TextButton onClick={mockFun} content="label" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<TextButton onClick={mockFun} content="label" />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
