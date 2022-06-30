import React from 'react'
import PropTypes from 'prop-types'

import useUser from '../../../hooks/useUser'

import Avatar from '../../Atoms/Avatar/Avatar'

import './VideoSmall.css'

VideoSmallPlaceholder.propTypes = {
  /** User id of user to query */
  userId: PropTypes.string,
}

export default function VideoSmallPlaceholder({ userId = '' }) {
  const { profileImage, displayName, loading } = useUser(userId)

  return <VideoSmallPlaceholderView profileImage={profileImage} displayName={displayName} loading={loading} />
}

export function VideoSmallPlaceholderView({ profileImage, displayName, loading }) {
  return (
    <div className="videosmall-placeholder-wrap">
      <Avatar loading={loading} displayName={displayName} size="large" imgUrl={profileImage} />
    </div>
  )
}
