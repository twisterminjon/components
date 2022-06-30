import React from 'react'
import TextInput from './TextInput'

describe('TextInput', () => {
  const name = 'user'
  const label = 'Klingon'
  const value = 'Worf'
  const placeholder = 'Star Trek'
  const error = 'It is busted'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <TextInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('applies the correct type to the input', () => {
    const wrapper = window.shallow(
      <TextInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
        type="tel"
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('passes the label prop down', () => {
    const wrapper = window.shallow(
      <TextInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper.find('InputLabel').prop('label')).toEqual(label)
  })

  it('passes the error prop down', () => {
    const wrapper = window.shallow(
      <TextInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={true}
      />
    )
    expect(wrapper.find('InputMessage').prop('message')).toEqual(error)
  })

  it('shows the required label', () => {
    const wrapper = window.shallow(
      <TextInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
        required={true}
      />
    )

    expect(wrapper.find('RequiredLabel').text()).toBeTruthy()
  })
})
