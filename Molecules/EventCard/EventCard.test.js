import React from 'react'
import EventCard from './EventCard'

describe('EventCard', () => {
  it('matches the snapshot', () => {
    const wrapper = window.mount(<EventCard renderIcon={() => null} label="Card title" date="11/11/2019" />)

    expect(wrapper.find(EventCard)).toMatchSnapshot()
  })
})
