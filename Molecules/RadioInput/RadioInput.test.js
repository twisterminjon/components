import React from 'react'
import RadioInput from './RadioInput'

describe('RadioInput', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.mount(
      <RadioInput label="radio1" name="radio1" value="radio1" checked={false} onChange={mockFun} />
    )

    expect(wrapper.find(RadioInput)).toMatchSnapshot()
  })
})
