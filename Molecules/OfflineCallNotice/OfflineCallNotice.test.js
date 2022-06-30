import React from 'react'
import OfflineCallNotice from './OfflineCallNotice'

describe('OfflineCallNotice', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot when visible', () => {
    const wrapper = window.shallow(
      <OfflineCallNotice show={true} onCancel={mockFunction} onGoToDashboard={mockFunction} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(
      <OfflineCallNotice show={false} onCancel={mockFunction} onGoToDashboard={mockFunction} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
