import React from 'react'
import OutgoingAudioCallNotice from './OutgoingAudioCallNotice'
import fakeImage from '../../../Images/ent-placeholder.png'

describe('OutgoingAudioCallNotice', () => {
  const name = 'Korben'
  const show = true

  it('matches the snapshot with skip call showing', () => {
    const wrapper = window.shallow(
      <OutgoingAudioCallNotice callingName={name} title="title" profilePic={fakeImage} show={show} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
