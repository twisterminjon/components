import React from 'react'
import ThreadListCard from './ThreadListCard'

describe('ThreadListCard', () => {
  const mockFun = jest.fn()

  // FIXME: this uses a timestamp and will be different each time it snapshots
  it.skip('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ThreadListCard
        name="test"
        isOwn={true}
        profileImage=""
        selected={false}
        unread={false}
        timestamp={'need to mock global date!!!'}
        message="message"
        onClick={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
