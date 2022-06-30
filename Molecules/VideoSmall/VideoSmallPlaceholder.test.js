import React from 'react'
import { VideoSmallPlaceholderView } from './VideoSmallPlaceholder'

describe('VideoSmallPlaceholder', () => {
  it('matches the base snapshot', () => {
    const wrapper = window.shallow(<VideoSmallPlaceholderView />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with loading', () => {
    const wrapper = window.shallow(<VideoSmallPlaceholderView loading={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with profile image', () => {
    const wrapper = window.shallow(<VideoSmallPlaceholderView profileImage={'https://www.fillmurray.com/400/400'} />)
    expect(wrapper).toMatchSnapshot()
  })
})
