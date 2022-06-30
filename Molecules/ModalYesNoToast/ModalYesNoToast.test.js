import React from 'react'
import ModalYesNoToast from './ModalYesNoToast'

// Suppress the console.warns for the tests. We will test that they are called manually.
console.warn = jest.fn()

describe('ModalYesNoToast', () => {
  const mockConfirm = jest.fn()
  const mockReject = jest.fn()
  const title = 'title'
  const message = 'message'
  const confirmText = 'yes'
  const rejectText = 'no'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast
        show={true}
        title={title}
        message={message}
        confirmButtonText={confirmText}
        rejectButtonText={rejectText}
        flip={false}
        onConfirm={mockConfirm}
        onReject={mockReject}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when flipped', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast
        show={true}
        title={title}
        message={message}
        confirmButtonText={confirmText}
        rejectButtonText={rejectText}
        flip={true}
        onConfirm={mockConfirm}
        onReject={mockReject}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches uses default values for the button text', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast
        show={true}
        title={title}
        message={message}
        flip={true}
        onConfirm={mockConfirm}
        onReject={mockReject}
      />
    )

    const confirmButton = wrapper.find('[data-testid="button-confirm"]')
    const rejectButton = wrapper.find('[data-testid="button-reject"]')

    expect(confirmButton.render().text()).toEqual('Yes')
    expect(rejectButton.render().text()).toEqual('No')
  })

  it('calls the function pass in onConfirm', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast show={true} title={title} flip={true} onConfirm={mockConfirm} onReject={mockReject} />
    )

    wrapper.find('[data-testid="button-confirm"]').simulate('click')
    expect(mockConfirm).toHaveBeenCalled()
  })

  it('calls the function pass in onReject', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast show={true} title={title} flip={true} onConfirm={mockConfirm} onReject={mockReject} />
    )

    wrapper.find('[data-testid="button-reject"]').simulate('click')

    expect(mockReject).toHaveBeenCalled()
  })

  it('uses a custom testid', () => {
    const wrapper = window.shallow(
      <ModalYesNoToast
        show={true}
        title={title}
        flip={true}
        onConfirm={mockConfirm}
        onReject={mockReject}
        data-testid="custom"
      />
    )

    expect(wrapper.find('[data-testid="custom"]')).toBeDefined()
  })
})
