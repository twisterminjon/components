import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash-es'

import InfiniteScroll from 'react-infinite-scroll-component'

import { USER_STATUS_LIST } from '../../../constants'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import AccordionTab from '../../Atoms/AccordionTab/AccordionTab'
import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import SearchBar from '../../Molecules/SearchBar/SearchBar'
import UserCardSimple from '../../Molecules/UserCardSimple/UserCardSimple'

import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './Thread.css'

ThreadAddUser.propTypes = {
  /** List of users to display */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      overallStatus: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    })
  ).isRequired,

  /** Call after a request to display the suggested groups */
  onShowGroups: PropTypes.func.isRequired,

  /** Called after adding a user to the message */
  onAddUser: PropTypes.func.isRequired,

  /** Called after choosing to return to search */
  onBack: PropTypes.func.isRequired,

  /** Called, with the search value, when the search is changed */
  onSearchChange: PropTypes.func.isRequired,

  /** Whether or not the list is loading */
  loading: PropTypes.bool.isRequired,

  /** The current paginated page number, starting from 0 */
  pageNumber: PropTypes.number.isRequired,

  /** Called, with the page number, after the page number changes */
  onPageNumberChange: PropTypes.func.isRequired,
}

export default function ThreadAddUser({
  users,
  onShowGroups,
  onAddUser,
  onBack,
  onSearchChange,
  loading,
  pageNumber,
  onPageNumberChange,
}) {
  const [filter, setFilter] = useState('')
  const handleSearchChange = filter => {
    setFilter(filter)
  }

  useEffect(() => {
    const debounced = debounce(() => {
      onSearchChange(filter)
    }, 250)

    debounced()

    return function unmount() {
      debounced.cancel()
    }
  }, [filter, onSearchChange])

  const renderResults = users.map(user => (
    <UserCardSimple
      key={user.id}
      userName={user.displayName}
      profileImage={user.profileImage}
      status={user.overallStatus}
      onClick={() => {
        onAddUser({ id: user.id, displayName: user.displayName })
      }}
    />
  ))

  return (
    <div className="messagethreadadduser" data-testid="add-member-to-message">
      <DocTitle title="Add Member" />
      <Banner label="Back to search" onSelect={onBack} />

      <AccordionTab
        label="Select from a suggested group"
        direction="right"
        onActivate={onShowGroups}
        data-testid="select-from-group"
      />
      <SearchBar value={filter} onChange={handleSearchChange} />
      {loading && (
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
      <div className="messagethreadadduser-results" id="list-users-to-add" data-testid="list-users-to-add">
        <InfiniteScroll
          scrollableTarget="list-users-to-add"
          dataLength={renderResults.length}
          next={() => onPageNumberChange(pageNumber + 1)}
          hasMore={!loading}
          loading={loading}>
          {renderResults}
        </InfiniteScroll>
      </div>
    </div>
  )
}

const Banner = ({ onSelect }) => {
  return (
    <button className="messagethreadaddgroup-banner" onClick={onSelect} data-testid="go-back">
      <IconChevronLeft color="white" />
      <span>Add someone to the message</span>
    </button>
  )
}
