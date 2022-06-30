import React from 'react'
import PatientButton from './PatientButton'

describe('PatientButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientButton onClick={mockFunction} label="button" icon="" loading={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(<PatientButton onClick={mockFunction} label="button" icon="" loading={true} />)
    expect(wrapper).toMatchSnapshot()
  })
})
