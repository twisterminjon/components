import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import InfiniteScroll from 'react-infinite-scroll-component'
import UserCardCall from '../../Molecules/UserCardCall/UserCardCall'

import './UserList.css'

UserList.propTypes = {
  /** Array of users to show */
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      overallStatus: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
    })
  ),

  /** Called when the call button is clicked */
  onCall: PropTypes.func.isRequired,

  /** Called when the message button is clicked */
  onMessage: PropTypes.func,

  /** If true, the message button will be shown */
  canMessage: PropTypes.bool.isRequired,

  /** If true, the dial button will be shown */
  canCall: PropTypes.bool,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,

  /** Whether or not the user list is loading */
  loading: PropTypes.bool,

  /** The current page number, starting from 0 */
  pageNumber: PropTypes.number,

  /** Called, with the current page number, after the page number changes */
  onPageNumberChange: PropTypes.func,
}

export default function UserList({
  onCall,
  canMessage,
  onMessage = () => {},
  canCall,
  userList,
  className,
  style,
  loading,
  pageNumber,
  onPageNumberChange = () => {},
  ...rest
}) {
  const userCardViews = userList.map(user => (
    <li key={user.id}>
      <UserCardCall
        canMessage={canMessage}
        canCall={canCall}
        userId={user.id}
        displayName={user.displayName}
        profileImage={user.profileImage}
        favorite={user.favorite}
        status={user.overallStatus}
        onCall={() => {
          onCall(user)
        }}
        onMessage={() => {
          onMessage(user)
        }}
        {...rest}
      />
    </li>
  ))

  return (
    <div id="userlist" className={cx('userlist', className)} style={style}>
      <InfiniteScroll
        scrollableTarget="userlist"
        dataLength={userList.length}
        next={() => onPageNumberChange(pageNumber + 1)}
        hasMore={!loading}
        loading={loading}>
        <ul>{userCardViews}</ul>
        <div style={{ height: 'var(--bottom-whitespace-v1)' }}></div>
      </InfiniteScroll>
    </div>
  )
}
