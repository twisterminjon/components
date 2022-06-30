import React from 'react'
import StatusBubble from './StatusBubble'

describe('StatusBubble', () => {
  it('matches the snapshot - available', () => {
    const wrapper = window.shallow(<StatusBubble status="available" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - busy', () => {
    const wrapper = window.shallow(<StatusBubble status="busy" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - offline', () => {
    const wrapper = window.shallow(<StatusBubble status="offline" />)
    expect(wrapper).toMatchSnapshot()
  })
})
