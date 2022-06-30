import React from 'react'
import IconDocuments from './IconDocuments'

describe('IconDocuments', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconDocuments color="grey" size={36} />)
    expect(wrapper).toMatchSnapshot()
  })
})
