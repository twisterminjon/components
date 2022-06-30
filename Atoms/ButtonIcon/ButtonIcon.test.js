import React from 'react'
import ButtonIcon from './ButtonIcon'

describe('ButtonIcon', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ButtonIcon onClick={mockFun} content="label" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<ButtonIcon onClick={mockFun} content="label" />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
