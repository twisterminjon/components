import React from 'react'
import PatientList from './PatientList'

// FIXME: This data structure doesn't match new "enterprises" data structure
// in PatientList
import { enterprises } from '../../../Mocks/Enterprise.mock'

import patientListMock from '../../../Mocks/PatientList.mock'

const rest = {
  match: {
    params: {
      enterpriseId: 1,
    },
  },
}

const mockFun = () => null

describe('PatientList', () => {
  it('matches the snapshot when no patient is selected', () => {
    const wrapper = window.shallow(
      <PatientList
        enterprises={enterprises}
        patients={patientListMock}
        selectedEnterpriseId={enterprises[0].id}
        // This is just for the test to stuff a pathname into the props
        location={{ pathname: '/app/patients' }}
        onPatientStatusUpdate={mockFun}
        patientsLoading={false}
        patientsPageNumber={0}
        patientsOnPageNumberChange={mockFun}
        enterprisesLoading={false}
        enterprisesPageNumber={0}
        enterprisesOnPageNumberChange={mockFun}
        {...rest}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when a patient is selected', () => {
    const wrapper = window.shallow(
      <PatientList
        enterprises={enterprises}
        patients={patientListMock}
        selectedEnterpriseId={enterprises[0].id}
        // This is just for the test to stuff a pathname into the props
        location={{ pathname: '/app/patients/4' }}
        onPatientStatusUpdate={mockFun}
        patientsLoading={false}
        patientsPageNumber={0}
        patientsOnPageNumberChange={mockFun}
        enterprisesLoading={false}
        enterprisesPageNumber={0}
        enterprisesOnPageNumberChange={mockFun}
        {...rest}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders with no users passed in', () => {
    const wrapper = window.shallow(
      <PatientList
        enterprises={[{ id: '1', name: 'Enterprise 1', patients: [] }]}
        patients={patientListMock}
        selectedEnterpriseId={enterprises[0].id}
        // This is just for the test to stuff a pathname into the props
        location={{ pathname: '/app/patients/4' }}
        onPatientStatusUpdate={mockFun}
        patientsLoading={false}
        patientsPageNumber={0}
        patientsOnPageNumberChange={mockFun}
        enterprisesLoading={false}
        enterprisesPageNumber={0}
        enterprisesOnPageNumberChange={mockFun}
        {...rest}
      />
    )

    expect(wrapper.find(PatientList)).toMatchSnapshot()
  })
})
