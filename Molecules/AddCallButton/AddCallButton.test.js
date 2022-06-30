import React from 'react'
import AddCallButton from './AddCallButton'

describe('AddCallButton', () => {
  const mockFun = jest.fn()

  it('matches the snapshot with a label', () => {
    const wrapper = window.shallow(
      <AddCallButton
        showLabel={true}
        enableCaregiver={true}
        enableInterpreter={true}
        onAddStaff={mockFun}
        onAddCaregiver={mockFun}
        onAddInterpreter={mockFun}
        canAddMoreParticipants={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with out a label', () => {
    const wrapper = window.shallow(
      <AddCallButton
        showLabel={false}
        enableCaregiver={false}
        enableInterpreter={true}
        onAddStaff={mockFun}
        onAddCaregiver={mockFun}
        onAddInterpreter={mockFun}
        canAddMoreParticipants={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('shows the menu when clicked', () => {
    const wrapper = window.mount(
      <AddCallButton
        showLabel={false}
        enableCaregiver={false}
        enableInterpreter={true}
        onAddStaff={mockFun}
        onAddCaregiver={mockFun}
        onAddInterpreter={mockFun}
        canAddMoreParticipants={true}
      />
    )
    // menu should be hidden to start
    expect(
      wrapper
        .find('.modaltoast-wrap')
        .find('[data-testid="add-to-call-modal"]')
        .hasClass('modaltoast--show')
    ).toBeFalsy()

    // find and click the button
    const buttonContainer = wrapper.find('[data-testid="button-add-call"]')
    const button = buttonContainer.find('button')
    button.simulate('click')

    // menu should be hidden to start
    expect(
      wrapper
        .find('[data-testid="add-to-call-modal"]')
        .find('.modaltoast-wrap')
        .hasClass('modaltoast--show')
    ).toBeTruthy()
  })

  it('shows the alert when clicked', () => {
    const wrapper = window.mount(
      <AddCallButton
        showLabel={false}
        enableCaregiver={false}
        enableInterpreter={true}
        onAddStaff={mockFun}
        onAddCaregiver={mockFun}
        onAddInterpreter={mockFun}
        canAddMoreParticipants={false}
      />
    )
    // menu should be hidden to start
    expect(
      wrapper
        .find('[data-testid="maximum-reached-modal"]')
        .find('.modaltoast-wrap')
        .hasClass('modaltoast--show')
    ).toBeFalsy()

    // find and click the button
    const buttonContainer = wrapper.find('[data-testid="button-add-call"]')
    const button = buttonContainer.find('button')
    button.simulate('click')

    // menu should be hidden to start
    expect(
      wrapper
        .find('[data-testid="maximum-reached-modal"]')
        .find('.modaltoast-wrap')
        .hasClass('modaltoast--show')
    ).toBeTruthy()
  })
})
