import React from 'react'

import ButtonIconSmall from './ButtonIconSmall'

import IconArrowRight from '../Icons/IconArrowRight'

describe('ButtonIconSmall', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ButtonIconSmall Icon={IconArrowRight} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with custon icom props', () => {
    const wrapper = window.shallow(
      <ButtonIconSmall
        Icon={IconArrowRight}
        iconProps={{
          color: 'red',
          size: 10,
        }}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
