import React from 'react'
import BackToCallHeader from './BackToCallHeader'

describe('BackToCallHeader', () => {
  const mockTitle = 'Title'
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<BackToCallHeader title={mockTitle} onBack={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<BackToCallHeader title={mockTitle} onBack={mockFunction} />)

    wrapper
      .find('[data-testid="back-to-call"]')
      .first()
      .simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
