import React from 'react'
import ButtonGroup from './ButtonGroup'

describe('ButtonGroup', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ButtonGroup
        buttonOneLabel="label 1"
        buttonTwoLabel="label 2"
        buttonOneOnClick={mockFun}
        buttonTwoOnClick={mockFun}
        active="1"
        loading={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
