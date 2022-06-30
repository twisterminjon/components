import React from 'react'
import TagCloud from './TagCloud'

describe('TagCloud', () => {
  const tagList = [
    { id: '1', name: 'Fantastic Four' },
    { id: '2', name: 'X-Men' },
  ]
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TagCloud tags={tagList} onTagDelete={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render 2 tags', () => {
    const wrapper = window.shallow(<TagCloud tags={tagList} onTagDelete={mockFun} />)
    expect(wrapper.children()).toHaveLength(2)
  })

  it('clicking on delete on a tag should call the delete function', () => {
    const wrapper = window.mount(<TagCloud tags={tagList} onTagDelete={mockFun} />)

    wrapper
      .find('[data-testid="tag-Fantastic Four-delete-button"]')
      .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
      .simulate('click')

    expect(mockFun).toHaveBeenCalledWith('1', 'Fantastic Four')
  })
})
