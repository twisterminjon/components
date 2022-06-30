import React from 'react'
import NavbarButton from './NavbarButton'

describe('NavbarButton', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<NavbarButton type="home" onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<NavbarButton type="home" onClick={mockFun} />)

    const button = wrapper.find('[data-testid="button-navbar-home"]')
    button.simulate('click')

    expect(mockFun).toHaveBeenCalled()
  })
})
