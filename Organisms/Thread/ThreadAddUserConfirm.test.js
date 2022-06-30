import React from 'react'

import ThreadAddUserConfirm from './ThreadAddUserConfirm'

describe('ThreadAddUserConfirm', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ThreadAddUserConfirm displayName="Lou Reed" show={true} onAdd={mockFun} onClose={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
