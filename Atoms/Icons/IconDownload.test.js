import React from 'react'
import IconDownload from './IconDownload'

describe('IconDownload', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<IconDownload color="red" size={36} />)

    expect(wrapper).toMatchSnapshot()
  })
})
