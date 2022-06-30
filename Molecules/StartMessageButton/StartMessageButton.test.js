import React from 'react'
import StartMessageButton from './StartMessageButton'

const mockFun = jest.fn()

describe('StartMessageButton', () => {
  it('matches the snapshot with no type', () => {
    const wrapper = window.shallow(<StartMessageButton ghost={false} onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with type="secure"', () => {
    const wrapper = window.shallow(<StartMessageButton ghost={false} type="secure" onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with type="ondemand"', () => {
    const wrapper = window.shallow(<StartMessageButton ghost={false} type="ondemand" onClick={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })
})
