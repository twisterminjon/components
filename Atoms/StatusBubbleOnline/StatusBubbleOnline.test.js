import React from 'react'
import StatusBubbleOnline from './StatusBubbleOnline'

describe('StatusBubbleOnline', () => {
  it('matches the snapshot - online', () => {
    const wrapper = window.shallow(<StatusBubbleOnline online={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - offline', () => {
    const wrapper = window.shallow(<StatusBubbleOnline online={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - always show', () => {
    const wrapper = window.shallow(<StatusBubbleOnline online={true} alwaysShow={true} />)
    expect(wrapper).toMatchSnapshot()
  })
})
