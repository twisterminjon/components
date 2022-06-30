import React from 'react'
import GroupCards from './GroupCards'

describe('GroupCards', () => {
  const mockFun = jest.fn()
  const groups = [
    {
      id: '1',
      name: 'beating heart',
    },
    {
      id: '2',
      name: 'black crow',
    },
  ]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<GroupCards groups={groups} onGroupClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with no groups passed in', () => {
    const wrapper = window.shallow(<GroupCards groups={[]} onGroupClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
