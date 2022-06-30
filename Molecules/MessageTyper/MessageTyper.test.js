import React from 'react'
import MessageTyper from './MessageTyper'

const mockFun = jest.fn()

afterEach(() => {
  mockFun.mockClear()
})

describe('MessageTyper', () => {
  it('matches the snapshot', () => {
    const wrapper = window.mount(<MessageTyper onSend={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls onSend when button clicked', () => {
    const message = 'I typing stuff'
    const wrapper = window.mount(<MessageTyper onSend={mockFun} message={message} setMessage={mockFun} />)

    const button = wrapper.find('[data-testid="send-message-button"]')
    button.childAt(0).simulate('click')

    expect(mockFun).toHaveBeenCalledWith(message)
  })

  it('calls onSend when "Enter" is pressed', () => {
    const message = 'I typing stuff'
    const wrapper = window.mount(<MessageTyper onSend={mockFun} message={message} setMessage={mockFun} />)

    const input = wrapper.find('[data-testid="send-message-input"]')

    input.find('textarea').simulate('keypress', {
      key: 'Enter',
      preventDefault: () => {},
    })

    expect(mockFun).toHaveBeenCalledWith(message)
  })

  it('does not call onSend when "Shift+Enter" is pressed', () => {
    const message = 'I typing stuff'
    const wrapper = window.mount(<MessageTyper onSend={mockFun} message={message} setMessage={mockFun} />)

    const input = wrapper.find('[data-testid="send-message-input"]')
    input.find('textarea').simulate('keypress', {
      key: 'Enter',
      shiftKey: true,
      preventDefault: () => {},
    })

    expect(mockFun).not.toHaveBeenCalledWith(message)
  })

  it('shows a message if sending a blank message', () => {
    const message = ''
    const wrapper = window.mount(<MessageTyper onSend={mockFun} message={message} setMessage={mockFun} />)

    // stuff in a message and click the button and set badmessage to true
    wrapper.setState({ badMessage: true })
    const input = wrapper.find('[data-testid="send-message-input"]')
    input.find('textarea').simulate('keypress', {
      key: 'Enter',
      shiftKey: true,
      preventDefault: () => {},
    })

    expect(mockFun).not.toHaveBeenCalled()
    expect(wrapper.find('[data-testid="message-empty-notice"]')).toBeTruthy()
  })
})
