import React from 'react'
import NotificationPage from './NotificationPage'

describe('NotificationPage', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <NotificationPage title="test title" message="test message" showDashboardLink={true} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot without a message', () => {
    const wrapper = window.shallow(<NotificationPage title="test title" showDashboardLink={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot without the dashboard link', () => {
    const wrapper = window.shallow(<NotificationPage title="test title" />)
    expect(wrapper).toMatchSnapshot()
  })
})
