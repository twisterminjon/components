import React from 'react'
import PatientTeam from './PatientTeam'
import data from './PatientDetails.faker'

describe('PatientTeam', () => {
  const mockFun = jest.fn()

  const user = data.user

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientTeam user={user} onSave={mockFun} loading={false} required={false} />)

    expect(wrapper.find(PatientTeam)).toMatchSnapshot()
  })
})
