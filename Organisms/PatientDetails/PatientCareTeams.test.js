import React from 'react'
import PatientCareTeams from './PatientCareTeams'

import data from '../../../Mocks/PatientDetails.mock'
import { enterpriseLookups } from '../../../Mocks/EnterpriseLookups.mock'

describe('PatientCareTeams', () => {
  const mockFun = jest.fn()

  const user = data.user
  const careTeams = enterpriseLookups.enterprise.roles

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PatientCareTeams user={user} onSave={mockFun} careTeamsLookup={careTeams} />)

    expect(wrapper.find(PatientCareTeams)).toMatchSnapshot()
  })
})
