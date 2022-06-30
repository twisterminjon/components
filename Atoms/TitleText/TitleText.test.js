import React from 'react'
import TitleText from './TitleText'

describe('TitleText', () => {
  const titleValue = 'Help me'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TitleText title={titleValue} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the correct title text', () => {
    const wrapper = window.shallow(<TitleText title={titleValue} />)
    expect(wrapper.find('h3').text()).toEqual(titleValue)
  })
})
