import React from 'react'

import NamedGroupEditor from './NamedGroupEditor'

import userLookup from '../../../Mocks/Users.mock'

describe('NamedGroupEditor', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <NamedGroupEditor
        userLookup={userLookup}
        members={[userLookup[0]]}
        editing={false}
        onSave={mockFun}
        onClose={mockFun}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
        onSearchChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot in edit mode', () => {
    const wrapper = window.shallow(
      <NamedGroupEditor
        userLookup={userLookup}
        members={[userLookup[0]]}
        editing={true}
        onSave={mockFun}
        onClose={mockFun}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
        onSearchChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <NamedGroupEditor
        userLookup={userLookup}
        members={[userLookup[0]]}
        editing={true}
        onSave={mockFun}
        onClose={mockFun}
        loading={true}
        pageNumber={0}
        onPageNumberChange={mockFun}
        onSearchChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
