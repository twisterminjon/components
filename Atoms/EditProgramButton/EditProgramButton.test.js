import React from 'react'
import EditProgramButton from './EditProgramButton'

describe('EditProgramButton', () => {
  const mockFun = jest.fn()

  it('EditProgramButton matches the snapshot', () => {
    const wrapper = window.shallow(<EditProgramButton onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<EditProgramButton onClick={mockFun} />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
