import React from 'react'
import VideoSmallAddCaller from './VideoSmallAddCaller'

describe('VideoSmallAddCaller', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<VideoSmallAddCaller displayName="Werner Von Braun" />)
    expect(wrapper).toMatchSnapshot()
  })
})
