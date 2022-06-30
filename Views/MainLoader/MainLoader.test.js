import React from 'react'
import MainLoader from './MainLoader'

jest.useFakeTimers()

describe('MainLoader', () => {
  it('matches the snapshot', () => {
    const wrapper = window.shallow(<MainLoader />)

    expect(wrapper).toMatchSnapshot()
  })

  it('warning is hidden on mount', () => {
    const wrapper = window.shallow(<MainLoader />)

    expect(wrapper.find('.mainloader-warning').hasClass('mainloader-warning--show')).toBeFalsy()
  })

  it('shows the warning after timing out', () => {
    const wrapper = window.shallow(<MainLoader />)

    jest.runAllTimers()
    wrapper.update() // <--- force re-render of the component

    expect(wrapper.find('.mainloader-warning').hasClass('mainloader-warning--show')).toBeTruthy()
  })
})
