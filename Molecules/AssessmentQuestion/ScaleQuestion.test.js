import React from 'react'

import ScaleQuestion from './ScaleQuestion'
import { ScaleQuestionData } from '../../../Mocks/Assessments.mock'

describe('ScaleQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ScaleQuestion data={ScaleQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
