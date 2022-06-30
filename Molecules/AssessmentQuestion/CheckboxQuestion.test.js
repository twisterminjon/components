import React from 'react'

import CheckboxQuestion from './CheckboxQuestion'
import { CheckboxQuestionData } from '../../../Mocks/Assessments.mock'

describe('CheckboxQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<CheckboxQuestion data={CheckboxQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
