import React from 'react'
import PatientContact from './PatientContact'
import data from './PatientDetails.faker'

describe('PatientContact', () => {
  const mockFun = jest.fn()

  const user = data.user

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

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientContact user={user} languages={languages} onSave={mockFun} loading={false} />
    )

    expect(wrapper.find(PatientContact)).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(<PatientContact user={user} languages={languages} onSave={mockFun} loading={true} />)

    expect(wrapper.find(PatientContact)).toMatchSnapshot()
  })
})
