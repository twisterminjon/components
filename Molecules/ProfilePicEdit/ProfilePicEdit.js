import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import EditButtonIcon from '../../Atoms/EditButtonIcon/EditButtonIcon'

import './ProfilePicEdit.css'

ProfilePicEdit.propTypes = {
  /** Can show a loader */
  loading: PropTypes.bool,

  /** Url for the profile image */
  profileImage: PropTypes.string,

  /** Can be disabled */
  disabled: PropTypes.bool,

  /** Called after the item is clicked */
  onClick: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

ProfilePicEdit.defaultProps = {
  profileImage: '',
  disabled: false,
  className: '',
  style: {},
}

export default function ProfilePicEdit({ loading, profileImage, disabled, onClick, className, style }) {
  return (
    <button
      data-testid="edit-profile-pic"
      className={`button-reset profilepicedit-button ${className}`.trim()}
      style={style}
      onClick={onClick}
      disabled={disabled}>
      <div className="profilepicedit">
        <Avatar imgUrl={profileImage} size="medium" loading={loading} />
        <EditButtonIcon className="profilepicedit-icon" />
      </div>
    </button>
  )
}
