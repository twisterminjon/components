import React from 'react'
import PropTypes from 'prop-types'
import useUser from '../../../hooks/useUser'

import Avatar from '../../Atoms/Avatar/Avatar'

import './VideoLarge.css'

VideoLargePlaceholder.propTypes = {
  /** User id of user to query */
  userId: PropTypes.string,
}

export default function VideoLargePlaceholder({ userId = '' }) {
  const { profileImage, displayName, loading } = useUser(userId)

  return <VideoLargePlaceholderView profileImage={profileImage} displayName={displayName} loading={loading} />
}

export function VideoLargePlaceholderView({ profileImage, displayName, loading }) {
  return (
    <div className="videolarge-placeholder-wrap">
      <Avatar loading={loading} displayName={displayName} size="massive" imgUrl={profileImage} />
    </div>
  )
}
