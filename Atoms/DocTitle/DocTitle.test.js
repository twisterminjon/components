import React from 'react'
import DocTitle from './DocTitle'

describe('DocTitle', () => {
  const prefix = 'Provider Portal - '

  it('it sets the title', () => {
    window.shallow(<DocTitle title="foo" />)
    expect(document.title).toEqual(`${prefix}foo`)
  })
})
