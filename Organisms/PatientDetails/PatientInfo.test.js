import React from 'react'
import PatientInfo from './PatientInfo'
import data from './PatientDetails.faker'

describe('PatientInfo', () => {
  const mockFun = jest.fn()

  const user = data.user

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientInfo user={user} onSave={mockFun} loading={false} onSendInvite={mockFun} sendInviteLoading={false} />
    )

    expect(wrapper.find(PatientInfo)).toMatchSnapshot()
  })
})
