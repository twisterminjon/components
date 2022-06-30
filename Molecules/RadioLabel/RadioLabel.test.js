import React from 'react'
import RadioLabel from './RadioLabel'

describe('RadioLabel', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.mount(
      <RadioLabel isChecked={true} onClick={mockFun}>
        <span style={{ color: 'white' }}>Option 1</span>
      </RadioLabel>
    )

    expect(wrapper.find(RadioLabel)).toMatchSnapshot()
  })
})
