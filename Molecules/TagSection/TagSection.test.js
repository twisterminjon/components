import React from 'react'
import TagSection from './TagSection'

describe('TagSection', () => {
  const currentTags = [
    { id: '0', name: 'X-wing', isActive: true },
    { id: '1', name: 'Tie Fighter', isActive: true },
  ]
  const allTags = [
    { id: '0', name: 'X-wing' },
    { id: '1', name: 'Tie Fighter' },
    { id: '2', name: 'Y-Wing' },
  ]
  const title = 'Ships'
  const hint = 'X-wing is the best'

  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <TagSection
        title={title}
        hint={hint}
        tags={currentTags}
        possibleTags={allTags}
        onChange={mockFun}
        showSelectPane={false}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('deleting a tag removes it from the list', () => {
    const wrapper = window.mount(
      <TagSection
        title={title}
        hint={hint}
        tags={currentTags}
        possibleTags={allTags}
        onChange={mockFun}
        showSelectPane={false}
        onClose={mockFun}
      />
    )

    wrapper
      .find('[data-testid="tag-X-wing-delete-button"]')
      .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
      .simulate('click')

    expect(
      wrapper
        .find('[data-testid="tag-cloud-Ships"]')
        .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
        .childAt(0)
    ).toHaveLength(1)
  })

  it('it adds a tag to the list', () => {
    const mockChange = jest.fn()

    const wrapper = window.mount(
      <TagSection
        title={title}
        hint={hint}
        tags={currentTags}
        possibleTags={allTags}
        onChange={mockChange}
        showSelectPane={false}
        onClose={mockFun}
      />
    )

    wrapper.instance().handleAddTag('4', 'Speeder Bike')
    expect(wrapper.state().currentTags).toHaveLength(3)
    expect(mockChange).toHaveBeenCalledWith([
      { id: '4', name: 'Speeder Bike', isActive: true },
      { id: '1', name: 'Tie Fighter', isActive: true },
      { id: '0', name: 'X-wing', isActive: true },
    ])
  })
})
