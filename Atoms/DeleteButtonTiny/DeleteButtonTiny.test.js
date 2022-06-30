import React from 'react'
import DeleteButtonTiny from './DeleteButtonTiny'

describe('DeleteButtonTiny', () => {
  const mockFun = jest.fn()

  it('DeleteButtonTiny matches the snapshot', () => {
    const wrapper = window.shallow(<DeleteButtonTiny onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<DeleteButtonTiny onClick={mockFun} />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
