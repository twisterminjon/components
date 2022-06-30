import React from 'react'
import ProgramTagSection from './ProgramTagSection'

describe('ProgramTagSection', () => {
  const currentTags = [
    { id: '4', program: { id: '0', name: 'X-wing', isActive: true } },
    { id: '5', program: { id: '1', name: 'Tie Fighter', isActive: true } },
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
      <ProgramTagSection
        title={title}
        hint={hint}
        enrolledPrograms={currentTags}
        allPrograms={allTags}
        onAdd={mockFun}
        onEdit={mockFun}
        showSelectPane={false}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('deleting a tag removes it from the list', () => {
    const wrapper = window.mount(
      <ProgramTagSection
        title={title}
        hint={hint}
        enrolledPrograms={currentTags}
        allPrograms={allTags}
        onAdd={mockFun}
        onEdit={mockFun}
        showSelectPane={false}
        onClose={mockFun}
      />
    )

    wrapper
      .find('[data-testid="programtag-X-wing-edit-button"]')
      .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
      .simulate('click')

    expect(wrapper.find('[data-testid="tag-cloud-Ships"]').childAt(0)).toHaveLength(1)
  })
})
