import React from 'react'
import NoAnswerGroupNotice from './NoAnswerGroupNotice'

describe('NoAnswerGroupNotice', () => {
  const mockFunction = jest.fn()
  const name = 'Korben'
  const show = true

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <NoAnswerGroupNotice
        callingName={name}
        profilePic=""
        show={show}
        onCancel={mockFunction}
        onRetry={mockFunction}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
