import React from 'react'

import SendImageModal from './SendImageModal'

describe('SendImageModal', () => {
  const mockFun = jest.fn()

  it('matches the snapshot when shown', () => {
    const wrapper = window.shallow(<SendImageModal show={true} onClose={mockFun} onSend={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(<SendImageModal show={false} onClose={mockFun} onSend={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
