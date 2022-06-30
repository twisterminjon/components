import React from 'react'
import AnswerCallButton from './AnswerCallButton'

describe('AnswerCallButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<AnswerCallButton onClick={mockFunction} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('calls the passed function when clicked', () => {
    const wrapper = window.mount(<AnswerCallButton onClick={mockFunction} />)

    wrapper.find('[data-testid="button-answer-call"]').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })
})
