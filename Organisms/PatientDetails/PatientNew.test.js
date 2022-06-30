import React from 'react'

import PatientNew from './PatientNew'

describe('PatientNew', () => {
  const mockFun = jest.fn()
  const languages = [
    {
      id: '1',
      code: 'EN',
      name: 'English',
    },
    {
      id: '2',
      code: 'SP',
      name: 'Spanish',
    },
  ]
  const enterpriseId = '1'

  const location = { state: { enterpriseId: '1' } }
  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientNew
        enterpriseId={enterpriseId}
        enterpriseLanguage="EN"
        onSave={mockFun}
        onCancel={mockFun}
        loading={false}
        teamRequired={false}
        languages={languages}
        location={location}
      />
    )

    // username contains the current datetime internally, just inject a fixed val
    wrapper.setState({ generatedUsername: 'new_patient_fixed_val' })

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <PatientNew
        enterpriseId={enterpriseId}
        enterpriseLanguage="EN"
        onSave={mockFun}
        onCancel={mockFun}
        loading={false}
        teamRequired={false}
        languages={languages}
        location={location}
      />
    )

    // username contains the current datetime internally, just inject a fixed val
    wrapper.setState({ generatedUsername: 'new_patient_fixed_val' })

    expect(wrapper).toMatchSnapshot()
  })
})
