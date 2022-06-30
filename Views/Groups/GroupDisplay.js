import React from 'react'
import PropTypes from 'prop-types'

import GroupHeader from './GroupHeader'
import GroupFooter from './GroupFooter'
import UserList from '../../Organisms/UserList/UserList'
import DocTitle from '../../Atoms/DocTitle/DocTitle'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'

import './GroupDisplay.css'

GroupDisplay.propTypes = {
  /** An array of groups to display */
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        overallStatus: PropTypes.string.isRequired,
        favorite: PropTypes.bool.isRequired,
      })
    ),
    /** Enterprise for this user */
    enterprise: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),

  /** Called when the group breadcrumb is clicked */
  onGoBack: PropTypes.func.isRequired,

  /** Start a call with a group */
  onGroupCall: PropTypes.func.isRequired,

  /** Start a call with a user */
  onCallUser: PropTypes.func.isRequired,

  /** Start a messaging with a user */
  onMessageUser: PropTypes.func,

  /** If true, will show the message button */
  canMessage: PropTypes.bool,

  /** If true, will show the dial button */
  canCall: PropTypes.bool,

  /** Whether or not there is an available group member */
  available: PropTypes.bool.isRequired,

  /** Whether or not the group user list is loading */
  loading: PropTypes.bool.isRequired,

  /** The current group user list page number, starting from 0 */
  pageNumber: PropTypes.number.isRequired,

  /** Called, with the the page number, after the user list page number changes */
  onPageNumberChange: PropTypes.func.isRequired,
}

GroupDisplay.defaultProps = {
  onMessageUser: () => {},
  canMessage: false,
}

export default function GroupDisplay({
  group,
  onGoBack,
  onGroupCall,
  onCallUser,
  onMessageUser,
  canMessage,
  canCall,
  available,
  loading,
  pageNumber,
  onPageNumberChange,
}) {
  const handleCallUser = user => {
    onCallUser(user)
  }

  const handleMessageUser = user => {
    onMessageUser(user)
  }

  return (
    <div className="groupdisplay-wrap">
      <DocTitle title="Group Call" />
      <div className="groupdisplay-content">
        <GroupHeader name={group.name} onClick={onGoBack} />
        {
          // FIXME: Add loading spinner to UserList itself to reduce code duplication
        }
        {loading && (
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              height: 40,
              display: 'inline-flex',
              width: '100%',
              alignContent: 'center',
              justifyContent: 'center',
              zIndex: 99999,
            }}>
            <SpinnerDots />
          </div>
        )}
        <div className="groupdisplay-list">
          <UserList
            canMessage={canMessage}
            canCall={canCall}
            userList={group.users}
            onCall={handleCallUser}
            onMessage={handleMessageUser}
            loading={loading}
            pageNumber={pageNumber}
            onPageNumberChange={onPageNumberChange}
          />
          <div style={{ height: 'var(--bottom-whitespace-v1)' }} />
        </div>
        <GroupFooter onClick={onGroupCall} disabled={!available || !canCall} />
      </div>
    </div>
  )
}
