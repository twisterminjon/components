import React from 'react'

import CaregiverMenu from './CaregiverMenu'
import data from '../../../Mocks/PatientDetails.mock'

describe('CaregiverMenu', () => {
  const mockResend = jest.fn()
  const mockEdit = jest.fn()
  const mockUnassign = jest.fn()
  const mockCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        resendLoading={false}
        sendProgramEvents={false}
        canAccessCode={true}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('calls the function passed in onResend', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        sendProgramEvents={false}
        canAccessCode={true}
      />
    )

    wrapper.find('[data-testid="button-resend"]').simulate('click')
    expect(mockResend).toHaveBeenCalled()
  })

  it('calls the function passed in mockEdit', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        sendProgramEvents={false}
        canAccessCode={true}
      />
    )

    wrapper.find('[data-testid="button-edit"]').simulate('click')
    expect(mockEdit).toHaveBeenCalled()
  })

  it('calls the function passed in mockUnassign', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        sendProgramEvents={false}
        canAccessCode={true}
      />
    )

    wrapper.find('[data-testid="button-unassign"]').simulate('click')
    expect(mockUnassign).toHaveBeenCalled()
  })

  it('calls the function passed in mockCancel', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        sendProgramEvents={false}
        canAccessCode={true}
      />
    )

    wrapper.find('[data-testid="button-cancel"]').simulate('click')
    expect(mockCancel).toHaveBeenCalled()
  })

  it('matches the snapshot when login key is disabled', () => {
    const wrapper = window.shallow(
      <CaregiverMenu
        user={data.user}
        show={true}
        onResend={mockResend}
        onEdit={mockEdit}
        onUnassign={mockUnassign}
        onCancel={mockCancel}
        sendProgramEvents={false}
        canAccessCode={false}
      />
    )

    wrapper.find('[data-testid="button-cancel"]').simulate('click')
    expect(mockCancel).toHaveBeenCalled()
  })
})
