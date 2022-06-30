import React from 'react'
import PatientListPlaceholder from './PatientListPlaceholder'

describe('PatientListPlaceholder', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientListPlaceholder />)
    expect(wrapper).toMatchSnapshot()
  })
})
