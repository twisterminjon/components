import React from 'react'
import Assessment from './Assessment'
import { surveys } from '../../../Mocks/Assessments.mock'

describe('Assessment', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Assessment surveys={surveys} onOpenSurvey={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })
})
