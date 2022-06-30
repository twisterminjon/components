import React from 'react'
import IconsReminder from './IconsReminder'

describe('IconsReminder', () => {
  it('matches the snapshot - careteam', () => {
    const wrapper = window.shallow(<IconsReminder name="careteam" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - message', () => {
    const wrapper = window.shallow(<IconsReminder name="message" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - visit', () => {
    const wrapper = window.shallow(<IconsReminder name="visit" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - survey', () => {
    const wrapper = window.shallow(<IconsReminder name="survey" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('uses a style object passed as a prop', () => {
    const wrapper = window.shallow(<IconsReminder name="visit" style={{ color: 'palevioletred' }} />)
    expect(wrapper.find('svg').prop('style')).toHaveProperty('color', 'palevioletred')
  })
})
