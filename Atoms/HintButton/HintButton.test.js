import React from 'react'
import HintButton from './HintButton'

describe('HintButton', () => {
  const content = 'default wait time is 30 seconds'

  it('renders without crashing', () => {
    window.shallow(<HintButton message={content} />)
  })

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<HintButton message={content} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders with an image', () => {
    const wrapper = window.shallow(<HintButton message={content} />)
    expect(wrapper.prop('content')).toEqual(content)
  })
})
