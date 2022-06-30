import React from 'react'
import ProgramTagCloud from './ProgramTagCloud'

describe('ProgramTagCloud', () => {
  const tagList = [
    { id: '4', program: { id: '0', name: 'X-men', isActive: true } },
    { id: '5', program: { id: '1', name: 'Fantastic Four', isActive: true } },
  ]
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ProgramTagCloud tags={tagList} onTagEdit={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render 2 tags', () => {
    const wrapper = window.shallow(<ProgramTagCloud tags={tagList} onTagEdit={mockFun} />)
    expect(wrapper.children()).toHaveLength(2)
  })

  it('clicking on edit on a tag should call the edit function', () => {
    const wrapper = window.mount(<ProgramTagCloud tags={tagList} onTagEdit={mockFun} />)

    wrapper
      .find('[data-testid="programtag-Fantastic Four-edit-button"]')
      .last() // Use last rendered component as the virtual DOM shows React components in addition to actual DOM components
      .simulate('click')

    expect(mockFun).toHaveBeenCalledWith('5', '1', 'Fantastic Four')
  })
})
