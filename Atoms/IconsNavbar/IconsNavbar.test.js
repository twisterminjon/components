import React from 'react'
import IconsNavbar from './IconsNavbar'

describe('IconsNavbar', () => {
  it('matches the snapshot - home', () => {
    const wrapper = window.shallow(<IconsNavbar name="home" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - staff', () => {
    const wrapper = window.shallow(<IconsNavbar name="staff" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - patients', () => {
    const wrapper = window.shallow(<IconsNavbar name="patients" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - message', () => {
    const wrapper = window.shallow(<IconsNavbar name="message" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - calls', () => {
    const wrapper = window.shallow(<IconsNavbar name="calls" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('uses a style object passed as a prop', () => {
    const wrapper = window.shallow(<IconsNavbar name="home" style={{ color: 'palevioletred' }} />)
    expect(wrapper.find('svg').prop('style')).toHaveProperty('color', 'palevioletred')
  })
})
