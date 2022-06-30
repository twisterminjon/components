import React from 'react'
import MessageText from './MessageText'

describe('MessageText', () => {
  it('matches the snapshot for sent', () => {
    const wrapper = window.shallow(
      <MessageText timestamp="2020-08-08T13:30:00" isOwn={false}>
        a message
      </MessageText>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for received', () => {
    const wrapper = window.shallow(
      <MessageText timestamp="2020-08-08T13:30:00" isOwn={false}>
        a message
      </MessageText>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
