import React from 'react'
import PatientSurveyIntervention from './PatientSurveyIntervention'

import { mockInterventions } from '../../../Mocks/Interventions.mock'

const mockFun = jest.fn()

describe('PatientSurveyIntervention', () => {
  it('matches the snapshot for populated interventions', () => {
    const wrapper = window.shallow(
      <PatientSurveyIntervention
        patientName="Sally Fields"
        assignedOn="2020-03-10"
        profileImage="https://some-image-url.com"
        interventions={mockInterventions}
        onResolve={mockFun}
        onSendMessage={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for populated interventions with canMessage set to false', () => {
    const wrapper = window.shallow(
      <PatientSurveyIntervention
        patientName="Sally Fields"
        assignedOn="2020-03-10"
        profileImage="https://some-image-url.com"
        interventions={mockInterventions}
        onResolve={mockFun}
        onSendMessage={mockFun}
        canMessage={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for unpopulated interventions', () => {
    const wrapper = window.shallow(
      <PatientSurveyIntervention
        patientName="Jane Dane"
        assignedOn="2020-01-20"
        profileImage="https://some-image-url.com"
        interventions={[]}
        onResolve={mockFun}
        onSendMessage={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
