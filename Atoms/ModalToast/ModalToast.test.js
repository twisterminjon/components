import React from 'react'
import ModalToast from './ModalToast'

describe('ModalToast', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<ModalToast show={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('uses a custom testid', () => {
    const wrapper = window.shallow(<ModalToast show={true} data-testid="custom" />)
    expect(wrapper.find('[data-testid="custom"]')).toBeDefined()
  })

  it('has the show class when shown', () => {
    const wrapper = window.shallow(<ModalToast show={true} />)
    const showPart = wrapper.find('[data-testid="modaltoast"]')
    expect(showPart.hasClass('modaltoast--show')).toBeTruthy()
  })

  it('show=false removes the show class', () => {
    const wrapper = window.shallow(<ModalToast show={false} />)
    const showPart = wrapper.find('[data-testid="modaltoast"]')
    expect(showPart.hasClass('modaltoast--show')).toBeFalsy()
  })

  it('matches the snapshot with a Header, Text, Button', () => {
    const wrapper = window.shallow(
      <ModalToast show={true}>
        <ModalToast.Header title={`Title`} />
        <ModalToast.Text>some text within a paragraph</ModalToast.Text>
        <ModalToast.Button buttonLabel={'close'} fluid onClick={mockFunction} />
        <ModalToast.Button fluid isGhostButton={true} onClick={mockFunction} />
      </ModalToast>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
