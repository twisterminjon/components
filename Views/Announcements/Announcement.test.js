import React from 'react'

import Announcement from './Announcement'
import { announcements } from '../../../Mocks/CurrentUser.mock'

describe('Announcement', () => {
  const mockFun = jest.fn()

  // We need to adjust the sentAt to be a 'display' time
  announcements.forEach(a => (a.time = '5hrs ago'))

  it('Announcement matches the snapshot', () => {
    const wrapper = window.shallow(
      <Announcement
        loading={false}
        removeLoading={false}
        announcement={announcements[2]}
        onRemove={mockFun}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('Announcement matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <Announcement
        loading={true}
        removeLoading={false}
        announcement={announcements[2]}
        onRemove={mockFun}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('Announcement matches the snapshot when remove loading', () => {
    const wrapper = window.shallow(
      <Announcement
        loading={false}
        removeLoading={true}
        announcement={announcements[2]}
        onRemove={mockFun}
        onClose={mockFun}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
