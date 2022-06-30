import React from 'react'
import RetryCallButton from './RetryCallButton'

describe('RetryCallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<RetryCallButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<RetryCallButton onClick={mockFunction} />)

    wrapper.find('[data-testid="button-retry-call"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
