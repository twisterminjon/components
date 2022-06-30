import React from 'react'

import CaregiverSectionMgr from './CaregiverSectionMgr'
import { enterprise } from '../../../Mocks/Enterprise.mock'
import patient from '../../../Mocks/PatientDetails.mock'

describe('CaregiverSectionMgr', () => {
  const caregivers = enterprise.users.filter(user => user.id === '18')[0].patient.caregivers
  const user = enterprise.users.filter(user => user.id === '18')[0]

  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverSectionMgr
        patientUser={patient.user}
        user={user}
        caregivers={caregivers}
        onOdm={mockFun}
        onCall={mockFun}
        onChangeSendOptions={mockFun}
        onMessage={mockFun}
        onRemove={mockFun}
        onResend={mockFun}
        onEdit={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
