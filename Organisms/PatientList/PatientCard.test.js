import React from 'react'
import PatientCard from './PatientCard'

describe('PatientCard', () => {
  const userName = 'Mung Bean'
  const profileImage = 'http://some.url.com/picture'
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <PatientCard
        userName={userName}
        profileImage={profileImage}
        onClick={mockFun}
        status="available"
        showDnc={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
