import React from 'react'
import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  const mockFunction = jest.fn()
  const value = 'Worf'
  const error = 'It is busted'

  it('renders without crashing', () => {
    window.shallow(<PasswordInput value={value} errorMessage={error} hasError={false} onChange={mockFunction} />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PasswordInput value={value} errorMessage={error} hasError={false} onChange={mockFunction} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
