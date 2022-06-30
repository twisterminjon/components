import React from 'react'
import PatientSurveyTag from './PatientSurveyTag'

describe('Tag', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for "active"', () => {
    const wrapper = window.shallow(
      <PatientSurveyTag
        name="Test assessement"
        id={1}
        active={true}
        started={false}
        interventionRequired={false}
        onTagDelete={mockFun}
        onIntervention={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for "active" and "started"', () => {
    const wrapper = window.shallow(
      <PatientSurveyTag
        name="Test assessement (active and started)"
        id={2}
        active={true}
        started={true}
        interventionRequired={false}
        onTagDelete={mockFun}
        onIntervention={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for "intervention required"', () => {
    const wrapper = window.shallow(
      <PatientSurveyTag
        name="Test assessement (intervention required)"
        id={3}
        active={true}
        started={true}
        interventionRequired={true}
        onTagDelete={mockFun}
        onIntervention={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
