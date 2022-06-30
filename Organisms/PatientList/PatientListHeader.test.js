import React from 'react'
import PatientListHeader from './PatientListHeader'

describe('PatientListHeader', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientListHeader title="Test header" />)
    expect(wrapper).toMatchSnapshot()
  })
})
