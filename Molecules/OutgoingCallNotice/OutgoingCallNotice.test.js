import React from 'react'
import OutgoingCallNotice from './OutgoingCallNotice'
import fakeImage from '../../../Images/ent-placeholder.png'

describe('OutgoingCallNotice', () => {
  const mockFunction = jest.fn()
  const name = 'Korben'
  const show = true

  it('matches the snapshot with skip call showing', () => {
    const wrapper = window.shallow(
      <OutgoingCallNotice
        callingName={name}
        title="title"
        profilePic={fakeImage}
        show={show}
        showSkipCall={true}
        onCancel={mockFunction}
        onSkip={mockFunction}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with skip call hidden', () => {
    const wrapper = window.shallow(
      <OutgoingCallNotice
        callingName={name}
        title="title"
        profilePic={fakeImage}
        show={show}
        showSkipCall={false}
        onCancel={mockFunction}
        onSkip={mockFunction}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when seeking', () => {
    const wrapper = window.shallow(
      <OutgoingCallNotice
        callingName={name}
        title="title"
        profilePic={fakeImage}
        show={show}
        showSkipCall={false}
        onCancel={mockFunction}
        onSkip={mockFunction}
        seekingNewCallee={true}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
