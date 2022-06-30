import React from 'react'
import UpdatePhoneForm from './UpdatePhoneForm'

describe('UpdatePhoneForm', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <UpdatePhoneForm
        show={true}
        onClose={mockFun}
        currentPhone={'+17272622331'}
        updateLoading={false}
        onUpdatePhone={mockFun}
        updateError={''}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when hidden', () => {
    const wrapper = window.shallow(
      <UpdatePhoneForm
        show={false}
        onClose={mockFun}
        currentPhone={'+17272622331'}
        updateLoading={false}
        onUpdatePhone={mockFun}
        updateError={''}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when saving phone', () => {
    const wrapper = window.shallow(
      <UpdatePhoneForm
        show={true}
        onClose={mockFun}
        currentPhone={'+17272622331'}
        updateLoading={true}
        onUpdatePhone={mockFun}
        updateError={''}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when getting phone', () => {
    const wrapper = window.shallow(
      <UpdatePhoneForm
        show={true}
        onClose={mockFun}
        currentPhone={'+17272622331'}
        updateLoading={false}
        phoneLoading={true}
        onUpdatePhone={mockFun}
        updateError={''}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
