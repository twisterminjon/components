import React from 'react'
import PatientSurveyInterventionMessage from './PatientSurveyInterventionMessage'

const mockFun = jest.fn()

describe('PatientSurveyInterventionMessage', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientSurveyInterventionMessage
        patientName="Sally Fields"
        profileImage="https://some-image-url.com"
        surveyQuestion="Test survey question"
        surveyAnswer="Test survey answer"
        onSend={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
