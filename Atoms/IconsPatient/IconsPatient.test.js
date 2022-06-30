import React from 'react'
import IconsPatient from './IconsPatient'

describe('IconsPatient', () => {
  it('matches the snapshot - info', () => {
    const wrapper = window.shallow(<IconsPatient name="info" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - contact', () => {
    const wrapper = window.shallow(<IconsPatient name="contact" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - program', () => {
    const wrapper = window.shallow(<IconsPatient name="program" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - careTeam', () => {
    const wrapper = window.shallow(<IconsPatient name="careTeam" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - envelope', () => {
    const wrapper = window.shallow(<IconsPatient name="envelope" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - edit', () => {
    const wrapper = window.shallow(<IconsPatient name="edit" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - flag', () => {
    const wrapper = window.shallow(<IconsPatient name="flag" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - plus', () => {
    const wrapper = window.shallow(<IconsPatient name="plus" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('uses a style object passed as a prop', () => {
    const wrapper = window.shallow(<IconsPatient name="info" style={{ color: 'palevioletred' }} />)
    expect(wrapper.find('svg').prop('style')).toHaveProperty('color', 'palevioletred')
  })
})
