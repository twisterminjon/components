import React from 'react'
import PatientsEmpty from './PatientsEmpty'

describe('PatientsEmpty', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientsEmpty />)

    expect(wrapper.find(PatientsEmpty)).toMatchSnapshot()
  })
})
