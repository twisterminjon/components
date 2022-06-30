import React from 'react'
import SectionTitle from './SectionTitle'

describe('SectionTitle', () => {
  const mockFun = jest.fn()
  const title = 'Help me'
  const hint = 'this is spinal tap'
  const buttonLabel = 'ADD'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<SectionTitle title={title} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the correct hint text', () => {
    const wrapper = window.mount(<SectionTitle title={title} hint={hint} />)

    expect(wrapper.find(`[hint="${hint}"]`)).toBeTruthy()
  })

  it('shows the button when a label is provided', () => {
    const wrapper = window.mount(<SectionTitle title={title} hint={hint} label={buttonLabel} />)

    expect(wrapper.find('[data-testid="section-button"]')).not.toBeNull()
  })

  it('contains the correct title text', () => {
    const wrapper = window.mount(<SectionTitle title={title} hint={hint} />)

    expect(wrapper.find('h3').text()).toEqual(title)
  })

  it('calls the onButtonClick function', () => {
    const wrapper = window.shallow(
      <SectionTitle title={title} hint={hint} label={buttonLabel} onButtonClick={mockFun} />
    )

    wrapper.find('[data-testid="section-button"]').simulate('click')

    expect(mockFun).toHaveBeenCalled()
  })
})
