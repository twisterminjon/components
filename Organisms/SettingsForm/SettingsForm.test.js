import React from 'react'
import SettingsForm from './SettingsForm'

describe('SettingsForm', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <SettingsForm
        show={true}
        loading={false}
        unitsLoading={false}
        units="imperial"
        onClose={mockFun}
        onUnitsChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(
      <SettingsForm
        show={false}
        loading={false}
        unitsLoading={false}
        units="imperial"
        onClose={mockFun}
        onUnitsChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
