import React from 'react'
import EventActionToast from './EventActionToast'

describe('EventActionToast', () => {
  const mockFun = jest.fn()

  // FIXME: This component genereates the current date. Needs to be updated to mock the date or pass it in.
  xit('matches the snapshot', () => {
    const wrapper = window.mount(
      <EventActionToast
        show={true}
        date={'2018-04-23'}
        onComplete={mockFun}
        onCancel={mockFun}
        onSave={mockFun}
        timezone="America/New_York"
      />
    )

    expect(wrapper.find(EventActionToast)).toMatchSnapshot()
  })
})
