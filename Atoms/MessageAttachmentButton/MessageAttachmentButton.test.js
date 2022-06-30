import React from 'react'
import MessageAttachmentButton from './MessageAttachmentButton'

describe('MessageAttachmentButton', () => {
  const mockFun = jest.fn()

  it('MessageAttachmentButton matches the snapshot', () => {
    const ref = React.createRef()
    const wrapper = window.mount(<MessageAttachmentButton onClick={mockFun} hiddenInput={ref} />)

    expect(wrapper).toMatchSnapshot()
  })
})
