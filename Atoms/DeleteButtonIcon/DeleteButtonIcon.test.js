import React from 'react'
import DeleteButtonIcon from './DeleteButtonIcon'

describe('DeleteButtonIcon', () => {
  const mockFun = jest.fn()

  it('DeleteButtonIcon matches the snapshot', () => {
    const wrapper = window.shallow(<DeleteButtonIcon onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('Uses the passed onClick function', () => {
    const wrapper = window.shallow(<DeleteButtonIcon onClick={mockFun} data-testid="check" />)
    wrapper.find('[data-testid="check"]').simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
