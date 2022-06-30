import React from 'react'
import AddCallMenu from './AddCallMenu'

describe('AddCallMenu', () => {
  const mockAddStaff = jest.fn()
  const mockAddCaregiver = jest.fn()
  const mockAddInterpreter = jest.fn()
  const mockGoBack = jest.fn()
  const showVal = true

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={showVal}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('calls add staff', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={showVal}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )

    wrapper.find('[data-testid="add-staff"]').simulate('click')
    expect(mockAddStaff).toHaveBeenCalled()
  })

  it('calls add caregiver', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={showVal}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )

    wrapper.find('[data-testid="add-caregiver"]').simulate('click')

    expect(mockAddCaregiver).toHaveBeenCalled()
  })

  it('calls add interpreter', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={showVal}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )
    wrapper.find('[data-testid="add-interpreter"]').simulate('click')

    expect(mockAddInterpreter).toHaveBeenCalled()
  })

  it('calls goback', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={showVal}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )

    wrapper.find('[data-testid="go-back"]').simulate('click')

    expect(mockGoBack).toHaveBeenCalled()
  })

  it('hides interpreter button when it is disabled', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={false}
        enableCaregivers={true}
        enableInterpreters={false}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )
    expect(wrapper.find('[data-testid="add-interpreter"]').exists()).toBeFalsy()
  })

  it('disables the caregivers button', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={false}
        enableCaregivers={false}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )

    expect(wrapper.find('[data-testid="add-caregiver"]').prop('disabled')).toBeTruthy()
  })

  it('enables the caregivers button', () => {
    const wrapper = window.shallow(
      <AddCallMenu
        show={false}
        enableCaregivers={true}
        enableInterpreters={true}
        onAddStaff={mockAddStaff}
        onAddCaregiver={mockAddCaregiver}
        onAddInterpreter={mockAddInterpreter}
        onBack={mockGoBack}
      />
    )

    expect(wrapper.find('[data-testid="add-caregiver"]').prop('disabled')).toBeFalsy()
  })
})
