import React from 'react'
import AccordionTab from './AccordionTab'

describe('AccordionTab', () => {
  const mockFun = jest.fn()
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<AccordionTab label="polka" direction="up" onActivate={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when inverted', () => {
    const wrapper = window.shallow(<AccordionTab label="polka" direction="up" onActivate={mockFun} inverted />)
    expect(wrapper).toMatchSnapshot()
  })
})
