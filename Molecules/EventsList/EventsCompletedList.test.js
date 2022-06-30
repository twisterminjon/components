import React from 'react'
import EventsCompletedList from './EventsCompletedList'

describe('EventsCompletedList', () => {
  it('matches the snapshot', () => {
    const wrapper = window.mount(<EventsCompletedList events={[]} />)

    expect(wrapper.find(EventsCompletedList)).toMatchSnapshot()
  })
})
