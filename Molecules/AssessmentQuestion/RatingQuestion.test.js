import React from 'react'

import RatingQuestion from './RatingQuestion'
import { RatingQuestionData } from '../../../Mocks/Assessments.mock'

describe('RatingQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<RatingQuestion data={RatingQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
