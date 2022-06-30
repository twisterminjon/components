import React from 'react'
import ProgramInfo from './ProgramInfo'

describe('ProgramInfo', () => {
  const mockFun = jest.fn()
  const user = {
    displayName: 'displayName',
    profileImage: 'profileImage',
  }

  const program = {
    id: '1',
    enrollmentId: '1',
    name: 'program',
    enrollDate: '2019-12-26',
  }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ProgramInfo user={user} program={program} onDisenroll={mockFun} />)

    expect(wrapper.find(ProgramInfo)).toMatchSnapshot()
  })
})
