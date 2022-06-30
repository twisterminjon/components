import React from 'react'
import PatientData from './PatientData'

describe('PatientData', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientData title="test" data="test text" />)
    expect(wrapper).toMatchSnapshot()
  })
})
