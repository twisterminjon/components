import React from 'react'

import ModalRequestReadingToast, { RequestVital } from './ModalRequestReadingToast'

// Suppress the console.warns for the tests. We will test that they are called manually.
console.warn = jest.fn()

describe('ModalRequestReadingToast', () => {
  const mockRequest = jest.fn()
  const mockCancel = jest.fn()

  it('matches the snapshot when not shown', () => {
    const wrapper = window.shallow(
      <ModalRequestReadingToast show={false} onRequest={mockRequest} onCancel={mockCancel} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when shown', () => {
    const wrapper = window.shallow(
      <ModalRequestReadingToast show={true} onRequest={mockRequest} onCancel={mockCancel} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('pass correct vital through onRequest', () => {
    const vital = 'temperature'

    const wrapper = window.shallow(
      <ModalRequestReadingToast show={true} onRequest={mockRequest} onCancel={mockCancel} />
    )

    wrapper.find(`[data-testid="request-${RequestVital[vital]}"]`).simulate('click')
    expect(mockRequest).toHaveBeenCalledWith(vital)
  })

  it('calls the function pass in onCancel', () => {
    const wrapper = window.shallow(
      <ModalRequestReadingToast show={true} onRequest={mockRequest} onCancel={mockCancel} />
    )

    wrapper.find('[data-testid="button-cancel"]').simulate('click')

    expect(mockCancel).toHaveBeenCalled()
  })
})
