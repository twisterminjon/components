import React from 'react'
import NoAnswerNotice from './NoAnswerNotice'
import fakeImage from '../../../Images/ent-placeholder.png'

describe('NoAnswerNotice', () => {
  const mockFunction = jest.fn()
  const name = 'Korben'
  const show = true

  it('matches the snapshot with a profile image', () => {
    const wrapper = window.shallow(
      <NoAnswerNotice
        callingName={name}
        profilePic=""
        show={show}
        onCancel={mockFunction}
        onRetry={mockFunction}
        profileImage={fakeImage}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot w/o a profile image', () => {
    const wrapper = window.shallow(
      <NoAnswerNotice
        callingName={name}
        profilePic=""
        show={show}
        onCancel={mockFunction}
        onRetry={mockFunction}
        profileImage=""
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
