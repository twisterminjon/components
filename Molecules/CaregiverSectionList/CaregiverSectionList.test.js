import React from 'react'

import CaregiverSectionList from './CaregiverSectionList'
import { enterprise } from '../../../Mocks/Enterprise.mock'
import patient from '../../../Mocks/PatientDetails.mock'

describe('CaregiverSectionList', () => {
  const mockFun = jest.fn()
  const caregivers = enterprise.users.filter(user => user.id === '18')[0].patient.caregivers

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverSectionList
        patientUser={patient.user}
        caregivers={caregivers}
        canOdm={true}
        canMessage={true}
        canCall={true}
        onOdm={mockFun}
        onCall={mockFun}
        onMessage={mockFun}
        onMenu={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render 2 caregivers', () => {
    const wrapper = window.shallow(
      <CaregiverSectionList
        patientUser={patient.user}
        caregivers={caregivers}
        canOdm={true}
        canMessage={true}
        canCall={true}
        onOdm={mockFun}
        onCall={mockFun}
        onMessage={mockFun}
        onMenu={mockFun}
      />
    )

    expect(wrapper.find('[data-testid="caregivers"]').children()).toHaveLength(2)
  })
})
