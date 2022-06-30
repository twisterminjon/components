import React from 'react'

import TagUserInput from './TagUserInput'
import users from '../../../Mocks/Users.mock'

describe('TextAreaInput', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TagUserInput value="Dave" users={users} onRemove={mockFun} onSearch={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
