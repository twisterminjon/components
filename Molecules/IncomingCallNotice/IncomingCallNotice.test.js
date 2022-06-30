import React from 'react'
import IncomingCallNotice from './IncomingCallNotice'
import fakeImage from '../../../Images/ent-placeholder.png'

describe('IncomingCallNotice', () => {
  const mockFunction = jest.fn()
  const name = 'Korben'
  const show = true

  it('matches the snapshot w/o a profile image', () => {
    const wrapper = window.shallow(
      <IncomingCallNotice
        callerName={name}
        show={show}
        onAnswer={mockFunction}
        onIgnore={mockFunction}
        profileImage=""
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/ a profile image', () => {
    const wrapper = window.shallow(
      <IncomingCallNotice
        callerName={name}
        show={show}
        onAnswer={mockFunction}
        onIgnore={mockFunction}
        profileImage={fakeImage}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/ a related user', () => {
    const wrapper = window.shallow(
      <IncomingCallNotice
        callerName={name}
        show={show}
        onAnswer={mockFunction}
        onIgnore={mockFunction}
        profileImage={fakeImage}
        relatedCallerName="Totally related caller"
        relatedProfileImage={fakeImage}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
