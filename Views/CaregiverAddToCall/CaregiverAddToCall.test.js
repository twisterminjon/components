import React from 'react'

import CaregiverAddToCall from './CaregiverAddToCall'
import { caregivers } from '../../../Mocks/Caregivers.mock'

describe('CaregiverAddToCall', () => {
  const mockCall = jest.fn()
  const mockOnBack = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <CaregiverAddToCall caregivers={caregivers} onStartCall={mockCall} onBack={mockOnBack} />
    )

    expect(wrapper.find(CaregiverAddToCall)).toMatchSnapshot()
  })

  it('calls onStartCall when clicked', () => {
    const wrapper = window.shallow(
      <CaregiverAddToCall caregivers={caregivers} onStartCall={mockCall} onBack={mockOnBack} />
    )

    wrapper.find('[data-testid="caregiver-card-Sally Supersonic"]').simulate('click')

    expect(mockCall).toHaveBeenCalledWith({
      displayName: 'Sally Supersonic',
      id: '19',
      profileImage: 'https://www.fillmurray.com/100/100',
    })
  })

  it('calls onBack when Caregivers button clicked', () => {
    const wrapper = window.shallow(
      <CaregiverAddToCall caregivers={caregivers} onStartCall={mockCall} onBack={mockOnBack} />
    )

    wrapper.find('[data-testid="go-back"]').simulate('click')
    expect(mockOnBack).toHaveBeenCalled()
  })
})
