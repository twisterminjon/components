import React from 'react'

import TextQuestion from './TextQuestion'
import { TextQuestionData } from '../../../Mocks/Assessments.mock'

describe('TextQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<TextQuestion data={TextQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
