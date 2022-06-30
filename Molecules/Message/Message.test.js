import React from 'react'
import renderer from 'react-test-renderer'

import Message from './Message'
import MessageText from '../../Atoms/MessageText/MessageText'

describe('Message', () => {
  it('matches the snapshot', () => {
    const comp = renderer.create(
      <Message
        isOwn={false}
        onRetry={() => undefined}
        timestamp="2020-08-08T13:30:15"
        profileImage=""
        displayName="test">
        <MessageText timestamp="2020-08-08T13:30:15">test message</MessageText>
      </Message>
    )

    expect(comp.toJSON()).toMatchSnapshot()
  })
})
