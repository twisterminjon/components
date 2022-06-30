import React from 'react'
import ToastMessage from './ToastMessage'

describe('ToastMessage', () => {
  it('matches the snapshot for type="info"', () => {
    const wrapper = window.shallow(<ToastMessage show={true} type="info" message="Its all gone Pete Tong" />)

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for type="warning"', () => {
    const wrapper = window.shallow(<ToastMessage show={true} type="warning" message="Its all gone Pete Tong" />)

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot for type="error"', () => {
    const wrapper = window.shallow(<ToastMessage show={true} type="error" message="Its all gone Pete Tong" />)

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(<ToastMessage show={false} type="error" message="Its all gone Pete Tong" />)

    expect(wrapper).toMatchSnapshot()
  })
})
