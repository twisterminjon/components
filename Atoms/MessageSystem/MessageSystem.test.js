import React from 'react'
import MessageSystem from './MessageSystem'

describe('MessageSystem', () => {
  it('matches the snapshot for USER_ADDED', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="USER_ADDED" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for GROUP_CREATED', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="GROUP_CREATED" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for INTERVENTION_STARTED', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="INTERVENTION_STARTED" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for INTERVENTION_RESOLVE', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="INTERVENTION_RESOLVE" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for INTERVENTION_COMPLETE', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="INTERVENTION_COMPLETE" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for UNREAD_LINE', () => {
    const wrapper = window.shallow(<MessageSystem text="this is a test" type="UNREAD_LINE" />)
    expect(wrapper).toMatchSnapshot()
  })
})
