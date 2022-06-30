import React from 'react'
import NewMessagesPopup from './NewMessagesPopup'

describe('NewMessagesPopup', () => {
  it('matches the snapshot when shown', () => {
    const wrapper = window.shallow(<NewMessagesPopup visible={true} onClick={() => undefined} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when not shown', () => {
    const wrapper = window.shallow(<NewMessagesPopup visible={false} onClick={() => undefined} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(<NewMessagesPopup visible={true} loading={true} onClick={() => undefined} />)
    expect(wrapper).toMatchSnapshot()
  })
})
