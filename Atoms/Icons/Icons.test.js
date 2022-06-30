import React from 'react'
import Icons from './Icons'

describe('Icons', () => {
  const icons = {
    search: 'search',
    arrowRight: 'arrowRight',
    arrowDown: 'arrowDown',
    phoneHangup: 'phoneHangup',
    phoneAnswer: 'phoneAnswer',
    userCircle: 'userCircle',
  }

  it('renders without crashing', () => {
    window.window.shallow(<Icons name={icons.search} />)
  })

  it('matches the snapshot - search', () => {
    const wrapper = window.shallow(<Icons name={icons.search} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - arrowRight', () => {
    const wrapper = window.shallow(<Icons name={icons.arrowRight} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - arrowDown', () => {
    const wrapper = window.shallow(<Icons name={icons.arrowDown} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - phoneHangup', () => {
    const wrapper = window.shallow(<Icons name={icons.phoneHangup} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - phoneAnswer', () => {
    const wrapper = window.shallow(<Icons name={icons.phoneAnswer} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot - userCircle', () => {
    const wrapper = window.shallow(<Icons name={icons.phoneAnswer} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('uses a style object passed as a prop', () => {
    const wrapper = window.shallow(<Icons name={icons.search} style={{ color: 'palevioletred' }} />)
    expect(wrapper.find('svg').prop('style')).toHaveProperty('color', 'palevioletred')
  })
})
