import React from 'react'

import TagUsers from './TagUsers'
import users from '../../../Mocks/Users.mock'

describe('TextAreaInput', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TagUsers onRemove={mockFun} users={users} />)
    expect(wrapper).toMatchSnapshot()
  })
})
