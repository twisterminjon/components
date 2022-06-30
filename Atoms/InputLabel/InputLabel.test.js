import React from 'react'
import InputLabel from './InputLabel'

describe('InputLabel', () => {
  const label = 'Klingon'

  it('renders without crashing', () => {
    window.shallow(<InputLabel label={label} />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<InputLabel label={label} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('shows the provided label text', () => {
    const wrapper = window.shallow(<InputLabel label={label} />)
    expect(wrapper.find('[data-testid="input-label"]').text()).toEqual(label)
  })
})
