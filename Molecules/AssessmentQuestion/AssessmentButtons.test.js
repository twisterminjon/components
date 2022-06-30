import React from 'react'

import AssessmentButtons from './AssessmentButtons'

describe('AssessmentButtons', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentButtons
        allowNext={true}
        onNext={mockFun}
        onPrevious={mockFun}
        status={{
          loadingForward: true,
          loadingBack: false,
        }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
