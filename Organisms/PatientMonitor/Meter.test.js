import React from 'react'

import { boolean } from '@storybook/addon-knobs'

import Meter from './Meter'

describe('Meter', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Meter value="100/7" label="bp" isIntervention={boolean('isIntervention', false)} />)
    expect(wrapper).toMatchSnapshot()
  })
})
