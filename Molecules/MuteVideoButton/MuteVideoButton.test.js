import React from 'react'
import MuteVideoButton from './MuteVideoButton'

describe('MuteVideoButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MuteVideoButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<MuteVideoButton onClick={mockFunction} />)

    wrapper.find('[data-testid="button-mute-video"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
