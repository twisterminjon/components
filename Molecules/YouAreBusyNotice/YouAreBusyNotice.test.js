import React from 'react'
import YouAreBusyNotice from './YouAreBusyNotice'

describe('YouAreBusyNotice', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<YouAreBusyNotice show={true} onCancel={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })
})
