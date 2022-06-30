import React from 'react'
import ProgramTag from './ProgramTag'

describe('ProgramTag', () => {
  const label = 'Legit'
  const id = '1'
  const enrollmentId = '234'
  const mockFun = jest.fn()
  const isComplete = false

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ProgramTag
        id={id}
        label={label}
        enrollmentId={enrollmentId}
        inActive={false}
        isComplete={isComplete}
        onEdit={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when inActive', () => {
    const wrapper = window.shallow(
      <ProgramTag
        id={id}
        label={label}
        enrollmentId={enrollmentId}
        inActive={true}
        isComplete={isComplete}
        onEdit={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('displays the correct text', () => {
    const wrapper = window.shallow(
      <ProgramTag
        id={id}
        label={label}
        enrollmentId={enrollmentId}
        inActive={false}
        isComplete={isComplete}
        onEdit={mockFun}
      />
    )

    expect(wrapper.find('[data-testid="programtag-Legit-text"]').text()).toEqual(label)
  })

  it('calls the edit function', () => {
    const wrapper = window.shallow(
      <ProgramTag
        id={id}
        label={label}
        enrollmentId={enrollmentId}
        inActive={false}
        isComplete={isComplete}
        onEdit={mockFun}
      />
    )

    wrapper.find('[data-testid="programtag-Legit-edit-button"]').simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
