import React from 'react'

import PatientDetails from './PatientDetails'
import { enterprise } from '../../../Mocks/Enterprise.mock'

describe('PatientDetails', () => {
  const mockFun = jest.fn()
  const user = enterprise.users.filter(user => user.id === '18')[0]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientDetails
        user={user}
        onStartCaregiverCall={mockFun}
        onStartPatientCall={mockFun}
        onSendInvite={mockFun}
        sendInviteLoading={false}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
