import React from 'react'
import PatientSectionTitle from './PatientSectionTitle'

describe('PatientSectionTitle', () => {
  const mockFun = jest.fn()

  it('matches the snapshot when NOT showing the edit button', () => {
    const wrapper = window.shallow(<PatientSectionTitle icon="info" text="test text" showEditButton={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when showing the edit button', () => {
    const wrapper = window.shallow(
      <PatientSectionTitle icon="info" text="test text" showEditButton={true} onEditClick={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
