import React from 'react'
import { VideoLargePlaceholderView } from './VideoLargePlaceholder'

describe('VideoLargePlaceholder', () => {
  it('matches the base snapshot', () => {
    const wrapper = window.shallow(<VideoLargePlaceholderView />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with loading', () => {
    const wrapper = window.shallow(<VideoLargePlaceholderView loading={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with profile image', () => {
    const wrapper = window.shallow(<VideoLargePlaceholderView profileImage={'https://www.fillmurray.com/400/400'} />)
    expect(wrapper).toMatchSnapshot()
  })
})
