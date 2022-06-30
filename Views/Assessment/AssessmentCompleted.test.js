import React from 'react'

import AssessmentCompleted from './AssessmentCompleted'

describe('AssessmentCompleted', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentCompleted
        title="Title"
        onBack={mockFun}
        onComplete={mockFun}
        status={{
          loadingForward: true,
          loadingBack: false,
        }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
