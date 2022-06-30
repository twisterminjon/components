import React from 'react'

import FlagQuestion from './FlagQuestion'
import { FlagQuestionData } from '../../../Mocks/Assessments.mock'

describe('FlagQuestion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<FlagQuestion data={FlagQuestionData.options} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
