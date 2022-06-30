import React from 'react'
import IconAnswerCall from './IconAnswerCall'

describe('IconAnswerCall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconAnswerCall color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
