import React from 'react'
import InterpreterCard from './InterpreterCard'

describe('InterpreterCard', () => {
  const mockedClick = jest.fn()
  const mockName = 'English'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<InterpreterCard disabled={false} onClick={mockedClick} name={mockName} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<InterpreterCard disabled={false} onClick={mockedClick} name={mockName} />)

    wrapper.find(`[data-testid="interpreter-card-${mockName}"]`).simulate('click')
    expect(mockedClick).toHaveBeenCalled()
  })
})
