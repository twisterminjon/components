import React from 'react'
import Tag from './Tag'

describe('Tag', () => {
  const label = 'Legit'
  const id = '1'
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Tag id={id} label={label} onDelete={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('displays the correct text', () => {
    // Not a shallow render since the internal tag view is a sub-rendered component
    const wrapper = window.mount(<Tag id={id} label={label} onDelete={mockFun} />)

    expect(wrapper.find('[data-testid="tag-Legit-text"]').text()).toEqual(label)
  })

  it('calls the delete function', () => {
    const wrapper = window.mount(<Tag id={id} label={label} onDelete={mockFun} />)

    wrapper
      .find('[data-testid="tag-Legit-delete-button"]')
      .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
      .simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
