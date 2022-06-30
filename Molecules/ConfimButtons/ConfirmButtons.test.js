import React from 'react'
import ConfirmButtons from './ConfirmButtons'

describe('ConfirmButtons', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ConfirmButtons onCancel={mockFun} loading={false} dirty={false} />)
    expect(wrapper).toMatchSnapshot()
  })
})
