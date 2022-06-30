import React from 'react'
import CallCompletedNotice from './CallCompletedNotice'

describe('CallCompletedNotice', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot when visible', () => {
    const wrapper = window.shallow(<CallCompletedNotice show={true} onCancel={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(<CallCompletedNotice show={false} onCancel={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })
})
