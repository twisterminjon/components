import React from 'react'
import DeclineCallButton from './DeclineCallButton'

describe('DeclineCallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<DeclineCallButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<DeclineCallButton onClick={mockFunction} />)
    wrapper.find('[data-testid="button-decline-call"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
