import React from 'react'
import ServerIssue from './ServerIssue'

describe('ServerIssue', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ServerIssue />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when offline', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

    const wrapper = window.shallow(<ServerIssue />)
    expect(wrapper).toMatchSnapshot()
  })
})
