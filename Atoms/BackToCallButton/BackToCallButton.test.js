import React from 'react'
import BackToCallButton from './BackToCallButton'

describe('BackToCallButton', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<BackToCallButton onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<BackToCallButton onClick={mockFun} />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
