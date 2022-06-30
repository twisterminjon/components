import React from 'react'
import PatientPrograms from './PatientPrograms'

import data from '../../../Mocks/PatientDetails.mock'
import { enterpriseLookups } from '../../../Mocks/EnterpriseLookups.mock'

describe('PatientPrograms', () => {
  const mockFun = jest.fn()

  const enrollments = data.user.patient.enrollments
  const programs = enterpriseLookups.enterprise.programs

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientPrograms
        onAddProgram={mockFun}
        onEditProgram={mockFun}
        programsLookup={programs}
        enrollments={enrollments}
      />
    )

    expect(wrapper.find(PatientPrograms)).toMatchSnapshot()
  })
})
