import React from 'react'
import Link from './Link'

describe('Link', () => {
  const childs = 'Mila J'

  it('renders without crashing', () => {
    window.shallow(<Link to="/somewhere">{childs}</Link>)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Link to="/somewhere">{childs}</Link>)
    expect(wrapper).toMatchSnapshot()
  })
})
