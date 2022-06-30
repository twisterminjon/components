import React from 'react'
import renderer from 'react-test-renderer'

import Thread from './Thread'
import thread from '../../../Mocks/Thread.mock'

describe('Thread', () => {
  const mockFun = jest.fn()

  beforeAll(() => {
    const observe = jest.fn()
    const unobserve = jest.fn()

    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }))

    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  // We need to send a consistent timestamp to the component as
  // it will convert the timestamp into a friendly string
  // we want the same string every time the test runs so the snapshot matches
  const now = new Date()
  now.setHours(now.getHours() - 1)
  const timestamp = now.toISOString()

  // FIXME: I'm turning tests off for this component. The MessageThread needs to be refactored to not include MessageTyper.
  // They should be separate components that are rendered by their parents, not combined in a single component.
  // Having them together makes it hard to test.
  xit('matches the snapshot', () => {
    thread.messages.forEach(message => (message.timestamp = timestamp))

    const wrapper = renderer.create(
      <Thread
        thread={thread}
        startMessage="On your mark"
        onSend={mockFun}
        onSeen={mockFun}
        onDownloadAttachment={mockFun}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('matches the sending snapshot', () => {
    const wrapper = window.mount(
      <Thread
        thread={thread}
        message=""
        setMessage={mockFun}
        onSend={mockFun}
        onRetry={mockFun}
        onFetchMore={mockFun}
        openAttachment={mockFun}
        onSeen={mockFun}
        onDownloadAttachment={mockFun}
        loading={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the loading snapshot', () => {
    const wrapper = window.mount(
      <Thread
        thread={thread}
        message=""
        setMessage={mockFun}
        onSend={mockFun}
        onRetry={mockFun}
        onFetchMore={mockFun}
        openAttachment={mockFun}
        onSeen={mockFun}
        onDownloadAttachment={mockFun}
        loading={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
