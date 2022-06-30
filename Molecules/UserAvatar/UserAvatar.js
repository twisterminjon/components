import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../../Atoms/Avatar/Avatar'
import StatusBubble from '../../Atoms/StatusBubble/StatusBubble'
import { USER_STATUS_LIST, USER_STATUS_BUSY, USER_STATUS_OFFLINE } from '../../../constants'
import './UserAvatar.css'

export default function UserAvatar({ size, profileImage, status, ...rest }) {
  return (
    <div className="useravatar-container" {...rest}>
      <Avatar imgUrl={profileImage} size={size} dimmed={[USER_STATUS_BUSY, USER_STATUS_OFFLINE].includes(status)} />
      <StatusBubble className="useravatar-statusbubble" status={status} />
    </div>
  )
}

// FIXME: This should not take a 'number' as a size. It should always be one of the strings.
UserAvatar.propTypes = {
  /** Size for the avatar */
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large', 'big', 'huge', 'massive']),
  ]),
  /** Url to an image to display */
  profileImage: PropTypes.string,
  /** The status to to display in the bubble */
  status: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
}

UserAvatar.defaultProps = {
  size: 32,
  profileImage: '',
}
