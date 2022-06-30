import React from 'react'

import CaregiverResults from './CaregiverResults'
import { caregivers } from '../../../Mocks/Caregivers.mock'

describe('CaregiverResults', () => {
  const mockAdd = jest.fn()
  const mockSelect = jest.fn()

  it('matches the snapshot with caregivers', () => {
    const wrapper = window.shallow(<CaregiverResults caregivers={caregivers} onAdd={mockAdd} onSelect={mockSelect} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <CaregiverResults caregivers={caregivers} onAdd={mockAdd} onSelect={mockSelect} loading={true} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with no caregivers found', () => {
    const wrapper = window.shallow(
      <CaregiverResults caregivers={[]} onAdd={mockAdd} onSelect={mockSelect} loading={false} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
