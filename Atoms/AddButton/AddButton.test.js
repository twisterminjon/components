import React from 'react'
import AddButton from './AddButton'

describe('AddButton', () => {
  const mockFun = jest.fn()

  it('AddButton matches the snapshot', () => {
    const wrapper = window.shallow(<AddButton onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<AddButton onClick={mockFun} />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
