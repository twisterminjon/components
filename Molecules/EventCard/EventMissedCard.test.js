import React from 'react'
import renderer from 'react-test-renderer'
import EventMissedCard from './EventMissedCard'
import { ProgramEventType } from '@shared/helpers'

describe('EventMissedCard', () => {
  const mockFun = jest.fn()
  const event = { type: ProgramEventType.CONTACT_CARE_TEAM, date: '2019-12-26' }
  const eventRPM = {
    type: ProgramEventType.REMOTE_MONITOR,
    date: '2019-12-27T11:00:00-04:00',
    startDate: '2019-12-26T11:00:00-04:00',
  }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<EventMissedCard event={event} onClick={mockFun} loading={false} />)

    expect(wrapper.find(EventMissedCard)).toMatchSnapshot()
  })

  it('matches the snapshot for RPM (startDate instead of date)', () => {
    const wrapper = renderer.create(<EventMissedCard event={eventRPM} onClick={mockFun} loading={false} />).toJSON()

    expect(wrapper).toMatchSnapshot()
  })
})
