import React from 'react'

import AssessmentBanner from './AssessmentBanner'
import { survey } from '../../../Mocks/Assessments.mock'

describe('AssessmentBanner', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<AssessmentBanner title={survey.title} />)
    expect(wrapper).toMatchSnapshot()
  })
})
