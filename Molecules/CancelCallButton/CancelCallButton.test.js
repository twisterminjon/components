import React from 'react'
import CancelCallButton from './CancelCallButton'

describe('CancelCallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<CancelCallButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.shallow(<CancelCallButton onClick={mockFunction} />)
    wrapper.find('[data-testid="button-cancel-call"]').simulate('click')

    expect(mockFunction).toHaveBeenCalled()
  })
})
