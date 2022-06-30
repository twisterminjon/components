import React from 'react'
import renderer from 'react-test-renderer'
import TimeStamp from './TimeStamp'

describe('TimeStamp', () => {
  // We need to send a consistent timestamp to the component as
  // it will convert the timestamp into a friendly string
  // we want the same string everytime the test runs so the snapshot matches
  const now = new Date()
  now.setHours(now.getHours() - 1)
  const timestamp = now.toISOString()

  it('matches the snapshot for sent', () => {
    const wrapper = renderer.create(<TimeStamp timestamp={timestamp} />)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
