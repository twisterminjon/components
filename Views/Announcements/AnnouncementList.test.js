import React from 'react'

import AnnouncementList from './AnnouncementList'
import { announcements } from '../../../Mocks/CurrentUser.mock'

describe('AnnouncementList', () => {
  const mockFun = jest.fn()

  it('AnnouncementList matches the snapshot', () => {
    // We need to adjust the sentAt to be a 'display' time
    announcements.forEach(a => (a.time = '5mins ago'))

    const wrapper = window.shallow(
      <AnnouncementList list={announcements} onView={mockFun} onRemove={mockFun} onClose={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
