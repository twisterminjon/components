import React from 'react'
import SelectSideBar from './SelectSideBar'

describe('SelectSideBar', () => {
  const mockCancel = jest.fn()
  const mockSelect = jest.fn()
  const title = 'Help me'
  const list = [
    { id: '0', name: 'X-wing' },
    { id: '1', name: 'Tie Fighter' },
  ]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the correct title text', () => {
    const wrapper = window.mount(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )

    expect(wrapper.find('h3').text()).toEqual(title)
  })

  it('should have rendered an item in the list with a value of Three', () => {
    const wrapper = window.mount(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )

    expect(wrapper.find('[data-testid="select-item-Three"]')).not.toBeNull()
  })

  it('clicking an item calls the onSelect function', () => {
    const wrapper = window.mount(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )
    wrapper.find('[data-testid="select-item-X-wing"]').simulate('click')

    expect(mockSelect).toBeCalled()
  })

  it('clicking the button calls the cancel function', () => {
    const wrapper = window.mount(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )

    wrapper
      .find('[data-testid="section-button"]')
      .at(1)
      .simulate('click')

    expect(mockCancel).toHaveBeenCalled()
  })

  it('should apply a filter with the value of "Tie"', () => {
    const wrapper = window.shallow(
      <SelectSideBar show={true} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )

    wrapper.find('[data-testid="sidebar-search-input"]').simulate('change', { target: { value: 'Tie' } })

    expect(wrapper.find('[data-testid="select-item-X-wing"]')).toHaveLength(0)
    expect(wrapper.find('[data-testid="select-item-Tie Fighter"]')).toHaveLength(1)
  })

  it('should not render if "show" is false', () => {
    const wrapper = window.shallow(
      <SelectSideBar show={false} title={title} list={list} onSelect={mockSelect} onCancel={mockCancel} />
    )
    expect(wrapper.type()).toBeNull()
  })
})
