import React from 'react'
import CaregiverAccessCode from './CaregiverAccessCode'

describe('CaregiverAccessCode', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverAccessCode accessCode={{ code: '12345', isExpired: false }} loading={false} onGetNewCode={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when expired', () => {
    const wrapper = window.shallow(
      <CaregiverAccessCode accessCode={{ code: '12345', isExpired: true }} loading={false} onGetNewCode={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when code is null', () => {
    const wrapper = window.shallow(
      <CaregiverAccessCode accessCode={{ code: null, isExpired: false }} loading={false} onGetNewCode={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <CaregiverAccessCode accessCode={{ code: '12345', isExpired: false }} loading={true} onGetNewCode={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
