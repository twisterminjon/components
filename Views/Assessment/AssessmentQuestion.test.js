import React from 'react'

import AssessmentQuestion from './AssessmentQuestion'
import {
  ScaleQuestionData,
  RadioQuestionData,
  CheckboxQuestionData,
  FlagQuestionData,
  PhotoQuestionData,
  TextQuestionData,
} from '../../../Mocks/Assessments.mock'

describe('AssessmentQuestion', () => {
  const mockFun = jest.fn()
  const status = {
    loadingForward: true,
    loadingBack: false,
  }

  it('scale question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={ScaleQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('radio question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={RadioQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('checkbox question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={CheckboxQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('flag question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={FlagQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('photo question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={PhotoQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('text question matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentQuestion
        title="Title"
        status={status}
        onNext={mockFun}
        onPrevious={mockFun}
        question={TextQuestionData}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
