import React from 'react'
import MessageAttachmentView from './MessageAttachmentView'

describe('MessageAttachmentView', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <MessageAttachmentView onClick={mockFun}>
        <img alt="attachment" src="https://www.fillmurray.com/800/1200" />
      </MessageAttachmentView>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
