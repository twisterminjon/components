import React from 'react'
import ChooseCallType from './ChooseCallType'
describe('ChooseCallType', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ChooseCallType
        show={true}
        onCancel={mockFunction}
        onHandleVideoCallStart={mockFunction}
        onHandleAudioCallStart={mockFunction}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
