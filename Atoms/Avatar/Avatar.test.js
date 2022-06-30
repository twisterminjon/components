import React from 'react'
import Avatar from './Avatar'

describe('Avatar', () => {
  const size = 24
  const src = 'https://www.fillmurray.com/60/60'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Avatar size={size} imgUrl={src} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with an image', () => {
    const wrapper = window.shallow(<Avatar size={size} imgUrl={src} />)
    expect(wrapper.find('img')).toBeTruthy()
  })

  it('shows placeholder when no image is provided', () => {
    const wrapper = window.shallow(<Avatar size={size} />)

    expect(wrapper.containsMatchingElement(<img alt="user avatar" src="user-placeholder.png" />)).toBeTruthy()
  })
})
