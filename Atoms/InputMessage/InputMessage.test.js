import React from 'react'
import InputMessage from './InputMessage'

describe('InputMessage', () => {
  const label = 'Klingon'

  it('renders without crashing', () => {
    window.shallow(<InputMessage message={label} show={true} />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<InputMessage message={label} show={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('shows the provided message text', () => {
    const wrapper = window.shallow(<InputMessage message={label} show={true} />)
    expect(wrapper.find('[data-testid="input-message"]').text()).toEqual(label)
  })

  it('does not render when show is false', () => {
    const wrapper = window.shallow(<InputMessage message={label} show={false} />)
    expect(wrapper.type()).toEqual(null)
  })
})
