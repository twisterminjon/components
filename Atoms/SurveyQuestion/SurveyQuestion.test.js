import React from 'react'
import SurveyQuestion from './SurveyQuestion'

const mockFun = jest.fn()

describe('SurveyQuestion', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <SurveyQuestion
        questionText="Test question text"
        answerText="Test answer"
        answeredOn="01/01/2020"
        onResolve={mockFun}
        onSendMessage={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with canMessage set to false', () => {
    const wrapper = window.shallow(
      <SurveyQuestion
        questionText="Test question text"
        answerText="Test answer"
        answeredOn="01/01/2020"
        onResolve={mockFun}
        onSendMessage={mockFun}
        canMessage={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
