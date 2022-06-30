import React from 'react'
import FavoriteCardMenu from './FavoriteCardMenu'

describe('FavoriteCardMenu', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <FavoriteCardMenu show={true} disableCall={false} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when calling is disabled', () => {
    const wrapper = window.shallow(
      <FavoriteCardMenu show={true} disableCall={true} onCall={mockFun} onMessage={mockFun} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
