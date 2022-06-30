import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import UserList from '../../Organisms/UserList/UserList'
import SearchBar from '../../Molecules/SearchBar/SearchBar'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './Staff.css'

import debug from 'debug'
const d = debug('project:Staff')

Staff.propTypes = {
  /** Array of users to display */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      overallStatus: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
    })
  ),
  /** Function called when the call button is clicked */
  onStartCall: PropTypes.func.isRequired,

  /** If true, will show the message button */
  canMessage: PropTypes.bool.isRequired,

  /** If true, will show the dial button */
  canCall: PropTypes.bool,

  /** Function called when the message button is clicked */
  onMessageUser: PropTypes.func,

  /** Styles applied to wrapper */
  style: PropTypes.object,

  /** Whether or not the results are loading */
  loading: PropTypes.bool.isRequired,

  /** The current page number (starting from 0, of the paginated search results) */
  pageNumber: PropTypes.number.isRequired,

  /** Called, with the page number index, after page number has changed */
  onPageNumberChange: PropTypes.func.isRequired,
}

Staff.defaultProps = {
  style: {},
  onMessageUser: () => {},
}

export default function Staff({
  users,
  onStartCall,
  canMessage,
  canCall,
  onMessageUser,
  style,
  loading,
  pageNumber,
  onPageNumberChange,
  onSearchChange,
}) {
  const handleStartCall = user => {
    d(`calling user ${user.id}, ${user.displayName}`)
    onStartCall(user)
  }

  const handleMessageUser = user => {
    onMessageUser(user)
  }

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    onSearchChange(searchValue)
  }, [searchValue, onSearchChange])

  return (
    <div className="staff" style={style}>
      <DocTitle title="Staff" />
      <SearchBar onChange={setSearchValue} value={searchValue} className="staff-searchbar" />
      {
        // FIXME: Add loading spinner to UserList itself to reduce code duplication
      }
      {loading && (
        <div className="namedgroupeditor-spinner-container">
          <SpinnerDots className="namedgroupeditor-spinner" />
        </div>
      )}
      <UserList
        canMessage={canMessage}
        canCall={canCall}
        userList={users}
        onCall={handleStartCall}
        onMessage={handleMessageUser}
        className="staff-list"
        loading={loading}
        pageNumber={pageNumber}
        onPageNumberChange={onPageNumberChange}
      />
    </div>
  )
}
