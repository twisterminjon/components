import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'

import Avatar from '../../Atoms/Avatar/Avatar'

import './TagUser.css'

TagUser.propTypes = {
  /** User's name */
  displayName: PropTypes.string.isRequired,

  /** The url to the user's profile pic */
  profileImage: PropTypes.string,

  /** Called after the tag is clicked*/
  onClick: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

TagUser.defaultProps = {
  className: '',
  style: {},
}

export default function TagUser({ profileImage, displayName, onClick, className, style }) {
  return (
    <button
      className={`button-reset taguser taguser-button ${className}`.trim()}
      style={style}
      onClick={onClick}
      data-testid={`tag-user-${displayName}`}>
      <Avatar displayName={displayName} imgUrl={profileImage} size="medium" />
      <span className="taguser-name">{displayName}</span>
      <Icon name="delete" style={{ margin: '0 6px 0 12px', color: 'var(--font_color_light)' }} />
    </button>
  )
}
