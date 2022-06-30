import React from 'react'
import ToastMessageClosable from './ToastMessageClosable'

describe('ToastMessageClosable', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for type="info"', () => {
    const wrapper = window.shallow(
      <ToastMessageClosable type="info" message="Its all gone Pete Tong" onClose={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for type="warning"', () => {
    const wrapper = window.shallow(
      <ToastMessageClosable type="warning" message="Its all gone Pete Tong" onClose={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for type="error"', () => {
    const wrapper = window.shallow(
      <ToastMessageClosable type="error" message="Its all gone Pete Tong" onClose={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
