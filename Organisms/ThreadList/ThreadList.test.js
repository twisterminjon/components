import React from 'react'
import renderer from 'react-test-renderer'

import ThreadList from './ThreadList'
import threads from '../../../Mocks/ThreadList.mock'

describe('ThreadList', () => {
  const mockFun = jest.fn()

  beforeAll(() => {
    const observe = jest.fn()
    const disconnect = jest.fn()

    window.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
    }))
  })

  it('matches the snapshot', () => {
    // We need to send a consistent timestamp to the component as
    // it will convert the timestamp into a friendly string
    // we want the same string every time the test runs so the snapshot matches
    const now = new Date()
    now.setHours(now.getHours() - 1)
    const timestamp = now.toISOString()

    threads.forEach(thread => (thread.timestamp = timestamp))

    const comp = renderer.create(
      <ThreadList
        threads={threads}
        selectedId="room1"
        onClick={mockFun}
        onShowGroupEditor={mockFun}
        onSearch={mockFun}
        hasMoreThreads={false}
        loading={false}
        onThreadClick={mockFun}
        onReachBottom={mockFun}
      />
    )
    const tree = comp.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
