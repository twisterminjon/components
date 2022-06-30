import React from 'react'
import ErrorCallNotice from './ErrorCallNotice'

describe('ErrorCallNotice', () => {
  const mockFunction = jest.fn()
  const show = true

  it('matches the snapshot with skip call showing', () => {
    const wrapper = window.shallow(
      <ErrorCallNotice show={show} onCancel={mockFunction} errorMsg={'This is an error message'} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
