import React from 'react'
import PropTypes from 'prop-types'

import TagUser from './TagUser'

TagUsers.propTypes = {
  /** List of users to display */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    })
  ),

  /** Called after a user is clicked */
  onRemove: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

TagUsers.defaultProps = {
  className: '',
  style: {},
}

export default function TagUsers({ users, onRemove, className, style }) {
  return (
    <div className={`tagusers ${className}`.trim()} style={style} data-testid="user-list">
      {users.map(user => (
        <TagUser
          key={user.id}
          displayName={user.displayName}
          profileImage={user.profileImage}
          onClick={() => onRemove(user.id)}
          className="tagusers-tag"
        />
      ))}
    </div>
  )
}
