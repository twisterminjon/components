import React from 'react'
import EventsPendingList from './EventsPendingList'

describe('EventsPendingList', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.mount(<EventsPendingList events={[]} loadingEvents={[]} onClick={mockFun} />)

    expect(wrapper.find(EventsPendingList)).toMatchSnapshot()
  })
})
