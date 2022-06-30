import React from 'react'

import AssessmentIntro from './AssessmentIntro'

describe('AssessmentIntro', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <AssessmentIntro
        title="Title"
        isStarted={false}
        description="Description"
        loading={false}
        completeBy="MM-DD-YYYY"
        estimate="10"
        onCancel={mockFun}
        onStart={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
