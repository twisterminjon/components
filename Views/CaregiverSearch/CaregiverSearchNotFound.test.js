import React from 'react'

import CaregiverSearchNotFound from './CaregiverSearchNotFound'

describe('CaregiverSearchNotFound', () => {
  const mockAdd = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<CaregiverSearchNotFound onAdd={mockAdd} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('clicking the add button calls the onAdd function', () => {
    const wrapper = window.mount(<CaregiverSearchNotFound onAdd={mockAdd} />)

    wrapper
      .find('[data-testid="add-caregiver"]')
      .at(1)
      .simulate('click')

    expect(mockAdd).toHaveBeenCalled()
  })
})
