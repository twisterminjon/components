import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { USER_STATUS_LIST } from '../../../constants'
import AccordionTab from '../../Atoms/AccordionTab/AccordionTab'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import UserCardSimple from '../../Molecules/UserCardSimple/UserCardSimple'

import InfiniteScroll from 'react-infinite-scroll-component'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './Thread.css'

ThreadAddGroup.propTypes = {
  /** Called after a user is selected */
  onAddUser: PropTypes.func.isRequired,

  /** Called after choosing to return to search */
  onBack: PropTypes.func.isRequired,

  /** Array of group objects, without the users */
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  /* Called, with the relevant group ID, after the expanded view group is changed */
  onExpandedGroupIdChange: PropTypes.func.isRequired,

  /** Whether or not the group headersresults are loading */
  groupsLoading: PropTypes.bool.isRequired,

  /** The current page number, starting from 0, of the paginated  group headers search results */
  groupsPageNumber: PropTypes.number.isRequired,

  /** Called, with the page number index, after group headers page number has changed */
  onGroupsPageNumberChange: PropTypes.func.isRequired,

  /** Array of users, for the currently expanded group */
  groupUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      overallStatus: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    })
  ).isRequired,

  /** Whether or not an active group's users are loading */
  groupUsersLoading: PropTypes.bool.isRequired,

  /** The current page number, starting from 0, of the paginated group users search results */
  groupUsersPageNumber: PropTypes.number.isRequired,

  /** Called, with the page number index, after the group users page number has changed */
  onGroupUsersPageNumberChange: PropTypes.func.isRequired,
}

export default function ThreadAddGroup({
  onAddUser,
  onBack,
  groups,
  onExpandedGroupIdChange,
  groupsLoading,
  groupsPageNumber,
  onGroupsPageNumberChange,
  groupUsers,
  groupUsersLoading,
  groupUsersPageNumber,
  onGroupUsersPageNumberChange,
}) {
  /** @type {Object} */
  const [expandedGroup, setExpandedGroup] = useState(null)

  useEffect(() => {
    onExpandedGroupIdChange((expandedGroup && expandedGroup.id.toString()) || '')
  }, [expandedGroup, onExpandedGroupIdChange])

  const handleGroupTabToggle = group => {
    setExpandedGroup(oldExpandedGroup => (!(oldExpandedGroup && oldExpandedGroup.name === group.name) ? group : null))
  }

  const groupTabViews = groups
    .filter(({ name }) => {
      if (!expandedGroup) {
        return true
      } else {
        return expandedGroup.name === name
      }
    })
    .map(group => {
      return (
        <AccordionTab
          key={group.id}
          label={group.name}
          direction={expandedGroup ? 'up' : 'down'}
          onActivate={() => {
            handleGroupTabToggle(group)
          }}
        />
      )
    })

  const groupUserCardViews = groupUsers.map(groupUser => {
    const { id, displayName, profileImage, overallStatus } = groupUser

    return (
      <UserCardSimple
        key={id}
        userName={displayName}
        profileImage={profileImage}
        status={overallStatus}
        onClick={() => {
          onAddUser({ id, displayName })
        }}
      />
    )
  })

  return (
    <div className="messagethreadadduser">
      <DocTitle title="Add Member" />

      <Banner onSelect={onBack} />

      {// Show static banner if expanded group
      expandedGroup && groupTabViews[0]}

      <div id="messagethreadaddgroup-results" className="messagethreadaddgroup-results">
        {(groupsLoading || groupUsersLoading) && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              textAlign: 'center',
            }}>
            <SpinnerDots style={{ display: 'inline-block' }} />
          </div>
        )}
        {!expandedGroup ? (
          <InfiniteScroll
            scrollableTarget="messagethreadaddgroup-results"
            dataLength={groupTabViews.length}
            next={() => onGroupsPageNumberChange(groupsPageNumber + 1)}
            hasMore={!groupsLoading}
            loading={groupsLoading}>
            {groupTabViews}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            scrollableTarget="messagethreadaddgroup-results"
            dataLength={groupUserCardViews.length}
            next={() => onGroupUsersPageNumberChange(groupUsersPageNumber + 1)}
            hasMore={!groupUsersLoading}
            loading={groupUsersLoading}>
            {groupUserCardViews}
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

const Banner = ({ onSelect }) => {
  return (
    <button className="messagethreadaddgroup-banner" onClick={onSelect} data-testid="go-back">
      <IconChevronLeft color="white" />
      <span>Add someone from a group</span>
    </button>
  )
}
