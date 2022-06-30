import React from 'react'
import PatientCaregivers from './PatientCaregivers'

import { enterprise } from '../../../Mocks/Enterprise.mock'

describe('PatientCaregivers', () => {
  const mockFun = jest.fn()

  const user = enterprise.users.filter(user => user.id === '18')[0]
  const allCaregivers = enterprise.users.filter(user => user.isCaregiver)

  // we need to fake a patient.user from the mock data
  const patient = { ...user.patient }
  patient.user = { ...user }
  delete user.patient
  user.patient = patient

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientCaregivers
        user={user}
        caregiversLookup={allCaregivers}
        onSave={mockFun}
        onMessage={mockFun}
        snedMessageEvents={false}
        onOdm={mockFun}
        onCall={mockFun}
        onChangeSendOptions={mockFun}
        onRemove={mockFun}
        onSearch={mockFun}
        onAddNewCaregiver={mockFun}
        onResend={mockFun}
        onEdit={mockFun}
      />
    )

    expect(wrapper.find(PatientCaregivers)).toMatchSnapshot()
  })
})
