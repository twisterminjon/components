import React from 'react'
import ModalYesNo from './ModalYesNo'

describe('ModalYesNo', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ModalYesNo show={true} title="test" message="message" onYes={mockFun} onNo={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
