import React from 'react'
import SkipCallButton from './SkipCallButton'

describe('SkipCallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SkipCallButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.shallow(<SkipCallButton onClick={mockFunction} />)
    wrapper.find('[data-testid="button-skip-call"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
