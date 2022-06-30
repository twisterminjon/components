import React from 'react'
import PhoneCountrySelector from './PhoneCountrySelector'

describe('PhoneCountrySelector', () => {
  const mockFun = jest.fn()
  const name = 'country'
  const value = 'US'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PhoneCountrySelector name={name} value={value} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
