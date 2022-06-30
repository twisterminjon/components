import React from 'react'
import CaregiverSearch from './CaregiverSearch'

describe('CaregiverSearch', () => {
  const mockCancel = jest.fn()
  const mockAdd = jest.fn()
  const mockSearch = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverSearch show={true} onCancel={mockCancel} onAdd={mockAdd} onSearch={mockSearch} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('clicking the button calls the onCancel function', () => {
    const wrapper = window.mount(
      <CaregiverSearch show={true} onCancel={mockCancel} onAdd={mockAdd} onSearch={mockSearch} />
    )

    wrapper
      .find('[data-testid="section-button"]')
      .at(1)
      .simulate('click')

    expect(mockCancel).toHaveBeenCalled()
  })

  it('clicking the add button calls the onAdd function', () => {
    const wrapper = window.mount(
      <CaregiverSearch show={true} onCancel={mockCancel} onAdd={mockAdd} onSearch={mockSearch} />
    )

    wrapper
      .find('[data-testid="add-caregiver"]')
      .at(0)
      .simulate('click')

    expect(mockAdd).toHaveBeenCalled()
  })
})
