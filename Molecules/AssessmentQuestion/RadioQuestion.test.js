import React from 'react'

import RadioQuestion from './RadioQuestion'
import { RadioQuestionData } from '../../../Mocks/Assessments.mock'

describe('RadioQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<RadioQuestion data={RadioQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
