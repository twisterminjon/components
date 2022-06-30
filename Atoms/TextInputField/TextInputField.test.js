import React from 'react'
import TextInputField from './TextInputField'

describe('TextInputField', () => {
  const mockFunction = jest.fn()
  const value = 'Worf'
  const placeholder = 'Star Trek'

  it('renders without crashing', () => {
    window.shallow(<TextInputField value={value} placeholder={placeholder} hasError={false} />)
  })

  it('renders with no props passed', () => {
    window.shallow(<TextInputField />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TextInputField value={value} placeholder={placeholder} hasError={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('adds the value passed in props', () => {
    const wrapper = window.shallow(<TextInputField value={value} placeholder={placeholder} hasError={false} />)

    expect(wrapper.prop('value')).toEqual(value)
  })

  it('adds shows the placeholder', () => {
    const wrapper = window.shallow(<TextInputField value={value} placeholder={placeholder} hasError={false} />)
    expect(wrapper.prop('placeholder')).toEqual(placeholder)
  })

  it('calls the onChange when text is entered', () => {
    const wrapper = window.shallow(
      <TextInputField value={''} placeholder={placeholder} hasError={false} onChange={mockFunction} />
    )
    wrapper.simulate('change', 'not worf')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('is a "text" control by default', () => {
    const wrapper = window.shallow(
      <TextInputField value={''} placeholder={placeholder} hasError={false} onChange={mockFunction} />
    )

    expect(wrapper.prop('type')).toEqual('text')
  })
})
