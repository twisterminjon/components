import React from 'react'
import ProgramEvents from './ProgramEvents'

describe('ProgramEvents', () => {
  const mockFun = jest.fn()
  const events = {
    missed: [],
    completed: [],
    pending: [],
  }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ProgramEvents events={events} onMarkComplete={mockFun} onReschedule={mockFun} timezone="America/New_York" />
    )

    expect(wrapper.find(ProgramEvents)).toMatchSnapshot()
  })
})
