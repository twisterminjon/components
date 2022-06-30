import React from 'react'

import ListHeader from './ListHeader'
import EventCompletedCard from '../../Molecules/EventCard/EventCompletedCard'
import { ProgramEventType } from '@shared/helpers'

describe('ListHeader', () => {
  const event = { type: ProgramEventType.CONTACT_CARE_TEAM, date: '2019-12-26' }

  it('matches the snapshot', () => {
    const wrapper = window.mount(
      <ListHeader label="Title">
        <EventCompletedCard event={event} />
      </ListHeader>
    )

    expect(wrapper.find(ListHeader)).toMatchSnapshot()
  })
})
