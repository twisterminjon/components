import React from 'react'
import FavButton from './FavButton'
import IconDeclineCall from '../../Atoms/Icons/IconDeclineCall'

describe('FavButton', () => {
  const mockFunction = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <FavButton onClick={mockFunction} color="red" name="test">
        <IconDeclineCall />
      </FavButton>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
