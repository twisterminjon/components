import React from 'react'
import PatientDetailsEmpty from './PatientDetailsEmpty'

describe('PatientDetailsEmpty', () => {
  it('matches the snapshot for no patients', () => {
    const wrapper = window.shallow(<PatientDetailsEmpty />)

    expect(wrapper.find(PatientDetailsEmpty)).toMatchSnapshot()
  })

  it('matches the snapshot when showing not found', () => {
    const wrapper = window.shallow(<PatientDetailsEmpty showNotFound={true} />)

    expect(wrapper.find(PatientDetailsEmpty)).toMatchSnapshot()
  })
})
