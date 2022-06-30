import React from 'react'
import OnDemandMessage from './OnDemandMessage'
import data from './mocks/OnDemandMessage.faker'

describe('OnDemandMessage', () => {
  const mockFun = jest.fn()

  const user = data.user
  const templates = data.templates

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <OnDemandMessage user={user} templates={templates} onGetMessageText={mockFun} onSend={mockFun} loading={false} />
    )

    expect(wrapper.find(OnDemandMessage)).toMatchSnapshot()
  })

  it('matches the snapshot with a message', () => {
    const wrapper = window.shallow(
      <OnDemandMessage
        user={user}
        templates={templates}
        messageText="some text"
        onGetMessageText={mockFun}
        onSend={mockFun}
        loading={false}
      />
    )

    expect(wrapper.find(OnDemandMessage)).toMatchSnapshot()
  })
})
