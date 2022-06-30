import React from 'react'
import EventsMissedList from './EventsMissedList'

describe('EventsMissedList', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.mount(<EventsMissedList events={[]} loadingEvent="" onClick={mockFun} />)

    expect(wrapper.find(EventsMissedList)).toMatchSnapshot()
  })
})
