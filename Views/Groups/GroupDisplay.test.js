import React from 'react'
import GroupDisplay from './GroupDisplay'

describe('GroupDisplay', () => {
  const mockFun = jest.fn()
  const userid = '5'
  const group = {
    id: '1',
    name: 'some group',
    users: [
      {
        id: '2',
        displayName: 'first last',
        profileImage: null,
        overallStatus: 'available',
        favorite: false,
      },
      {
        id: '3',
        displayName: 'first ',
        profileImage: 'www.projectified/image.png',
        overallStatus: 'busy',
        favorite: false,
      },
      {
        id: '4',
        displayName: ' last',
        profileImage: null,
        overallStatus: 'offline',
        favorite: false,
      },
    ],
    enterprise: {
      id: '134dfs',
      name: 'some name',
    },
  }

  const groupEmpty = {
    id: '1',
    name: 'some group',
    users: [],
    enterprise: {
      id: '134dfs',
      name: 'some name',
    },
  }

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <GroupDisplay
        userid={userid}
        group={group}
        onGoBack={mockFun}
        onGroupCall={mockFun}
        onCallUser={mockFun}
        onFavoriteUser={mockFun}
        enterpriseLogo=""
        canMessage={true}
        canCall={true}
        available={true}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when not available', () => {
    const wrapper = window.shallow(
      <GroupDisplay
        userid={userid}
        group={group}
        onGoBack={mockFun}
        onGroupCall={mockFun}
        onCallUser={mockFun}
        onFavoriteUser={mockFun}
        enterpriseLogo=""
        canMessage={true}
        canCall={true}
        available={false}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with no users', () => {
    const wrapper = window.shallow(
      <GroupDisplay
        group={groupEmpty}
        onGoBack={mockFun}
        onGroupCall={mockFun}
        onCallUser={mockFun}
        onFavoriteUser={mockFun}
        canMessage={true}
        available={false}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot when loading', () => {
    const wrapper = window.shallow(
      <GroupDisplay
        userid={userid}
        group={group}
        onGoBack={mockFun}
        onGroupCall={mockFun}
        onCallUser={mockFun}
        onFavoriteUser={mockFun}
        canMessage={true}
        available={true}
        loading={false}
        pageNumber={0}
        onPageNumberChange={mockFun}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
