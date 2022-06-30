import React from 'react'
import RequiredLabel from './RequiredLabel'

describe('RequiredLabel', () => {
  const label = 'The Shire'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<RequiredLabel label={label} />)
    expect(wrapper).toMatchSnapshot()
  })
})
