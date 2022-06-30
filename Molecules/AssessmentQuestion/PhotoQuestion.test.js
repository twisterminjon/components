import React from 'react'

import PhotoQuestion from './PhotoQuestion'
import { PhotoQuestionData } from '../../../Mocks/Assessments.mock'

describe('FlagQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<PhotoQuestion data={PhotoQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
