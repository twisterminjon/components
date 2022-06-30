import React from 'react'
import EventPendingCard from './EventPendingCard'
import { ProgramEventType } from '@shared/helpers'

describe('EventPendingCard', () => {
  const mockFun = jest.fn()
  const event = { type: ProgramEventType.CONTACT_CARE_TEAM, startDate: '2019-12-26' }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<EventPendingCard event={event} onClick={mockFun} loading={false} />)

    expect(wrapper.find(EventPendingCard)).toMatchSnapshot()
  })
})
