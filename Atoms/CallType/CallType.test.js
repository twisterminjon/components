import React from 'react'
import CallType from './CallType'

describe('CallType', () => {
  it('matches snapshot for INCOMING', () => {
    const wrapper = window.shallow(<CallType type="INCOMING" dimmed={false} missed={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot for outgoing', () => {
    const wrapper = window.shallow(<CallType type="OUTGOING" dimmed={false} missed={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when dimmed', () => {
    const wrapper = window.shallow(<CallType type="OUTGOING" dimmed={true} missed={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when missed', () => {
    const wrapper = window.shallow(<CallType type="OUTGOING" dimmed={true} missed={true} />)
    expect(wrapper).toMatchSnapshot()
  })
})
