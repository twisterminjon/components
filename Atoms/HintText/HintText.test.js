import React from 'react'
import HintText from './HintText'

describe('HintText', () => {
  const hintValue = 'I am a hint'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<HintText hint={hintValue} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the correct hint text', () => {
    const wrapper = window.shallow(<HintText hint={hintValue} />)
    expect(wrapper.text()).toEqual(hintValue)
  })
})
