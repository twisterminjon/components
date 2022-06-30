import React from 'react'
import MenuItem from './MenuItem'

describe('MenuItem', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MenuItem label="test" onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<MenuItem label="test" onClick={mockFun} />)

    wrapper.find('[data-testid="button-menu-test"]').simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
