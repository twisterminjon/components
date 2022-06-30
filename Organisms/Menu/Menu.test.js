import React from 'react'
import Menu from './Menu'

describe('Menu', () => {
  const mockFun = jest.fn()

  it('Menu matches the snapshot', () => {
    const wrapper = window.shallow(
      <Menu visible={true} onMenuItem={mockFun} onHide={mockFun}>
        App
      </Menu>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
