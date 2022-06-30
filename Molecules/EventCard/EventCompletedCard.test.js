import React from 'react'
import EventCompletedCard from './EventCompletedCard'
import { ProgramEventType } from '@shared/helpers'

describe('EventCompletedCard', () => {
  const event = { type: ProgramEventType.CONTACT_CARE_TEAM, date: '2019-12-26' }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<EventCompletedCard event={event} />)

    expect(wrapper.find(EventCompletedCard)).toMatchSnapshot()
  })
})
