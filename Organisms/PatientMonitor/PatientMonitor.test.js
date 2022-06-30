import React from 'react'

import PatientMonitor from './PatientMonitor'
import PatientDetails from '../../../Mocks/PatientDetails.mock'

describe('PatientMonitor', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for metric', () => {
    const wrapper = window.shallow(
      <PatientMonitor
        loading={false}
        readings={PatientDetails.user.vitalsReadings}
        units="metric"
        onClose={mockFun}
        onRequest={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for imperial', () => {
    const wrapper = window.shallow(
      <PatientMonitor
        loading={false}
        readings={PatientDetails.user.vitalsReadings}
        units="imperial"
        onClose={mockFun}
        onRequest={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <PatientMonitor
        loading={true}
        readings={PatientDetails.user.vitalsReadings}
        units="imperial"
        onClose={mockFun}
        onRequest={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when requesting', () => {
    const wrapper = window.shallow(
      <PatientMonitor
        requesting={true}
        readings={PatientDetails.user.vitalsReadings}
        units="imperial"
        onClose={mockFun}
        onRequest={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when no readings', () => {
    const wrapper = window.shallow(
      <PatientMonitor loading={true} readings={[]} units="imperial" onClose={mockFun} onRequest={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
