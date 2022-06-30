import React from 'react'
import PhoneInput from './PhoneInput'

describe('PhoneInput', () => {
  const mockFun = jest.fn()
  const name = 'phone'
  const label = 'Klingon'
  const value = '+79123456789'
  const placeholder = 'Star Trek'
  const error = 'It is busted'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PhoneInput
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
        onChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
