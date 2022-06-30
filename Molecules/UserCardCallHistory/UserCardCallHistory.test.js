import React from 'react'
import UserCardCallHistory from './UserCardCallHistory'

describe('UserCardCallHistory', () => {
  const mockFun = jest.fn()

  it('matches the snapshot for incoming', () => {
    const wrapper = window.shallow(
      <UserCardCallHistory
        type="INCOMING"
        date="2020-01-28T21:30:15"
        displayName="The Scarlet Witch"
        profileImage="https://www.fillmurray.com/500/500"
        canDial={true}
        onDial={mockFun}
        status="available"
        missed={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for outgoing', () => {
    const wrapper = window.shallow(
      <UserCardCallHistory
        type="OUTGOING"
        date="2020-01-28T21:30:15"
        displayName="The Scarlet Witch"
        profileImage="https://www.fillmurray.com/500/500"
        canDial={false}
        onDial={mockFun}
        status="available"
        missed={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when missed', () => {
    const wrapper = window.shallow(
      <UserCardCallHistory
        type="INCOMING"
        date="2020-01-28T21:30:15"
        displayName="The Scarlet Witch"
        profileImage="https://www.fillmurray.com/500/500"
        canDial={true}
        onDial={mockFun}
        status="available"
        missed={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when canDial is false', () => {
    const wrapper = window.shallow(
      <UserCardCallHistory
        type="INCOMING"
        date="2020-01-28T21:30:15"
        displayName="The Scarlet Witch"
        profileImage="https://www.fillmurray.com/500/500"
        canDial={false}
        onDial={mockFun}
        status="available"
        missed={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
