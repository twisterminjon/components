import React from 'react'
import ContactTypes from './ContactTypes'

describe('ContactTypes', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ContactTypes value="BOTH" onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when display only', () => {
    const wrapper = window.shallow(<ContactTypes value="BOTH" onChange={mockFun} displayOnly={true} />)
    expect(wrapper).toMatchSnapshot()
  })
})
