import React from 'react'
import TextInputFieldArea from './TextInputFieldArea'

describe('TextInputFieldArea', () => {
  const mockFunction = jest.fn()
  const value = 'Message on line 1'

  it('renders with no props passed', () => {
    window.shallow(<TextInputFieldArea />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TextInputFieldArea value={value} hasError={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('adds the value passed in props', () => {
    const wrapper = window.shallow(<TextInputFieldArea value={value} hasError={false} />)

    expect(wrapper.prop('value')).toEqual(value)
  })

  it('calls the onChange when text is entered', () => {
    const wrapper = window.shallow(<TextInputFieldArea value={''} hasError={false} onChange={mockFunction} />)
    wrapper.simulate('change', 'not a message')
    expect(mockFunction).toHaveBeenCalled()
  })
})
