import React from 'react'
import PropTypes from 'prop-types'

import AvatarGroup from './AvatarGroup'
import IconAddUser from '../../Atoms/Icons/IconAddUser'

import './MessageBanner.css'

MessageBannerGroup.propTypes = {
  /** Name of the group */
  name: PropTypes.string.isRequired,

  /** Called after the add user action */
  onAdd: PropTypes.func.isRequired,
}

MessageBannerGroup.defaultProps = {
  className: '',
  style: {},
}

export default function MessageBannerGroup({ name, onAdd, className, style }) {
  return (
    <div className={`messagebanner ${className}`} style={style} data-testid="message-banner">
      <div className="messagebanner-avatar-wrap">
        <AvatarGroup />
      </div>
      <span className="messagebanner-label" style={{ flex: 1 }}>
        {name}
      </span>
      <button className="messagebanner-button messagebanner-adduser-button" onClick={onAdd} data-testid="add-user">
        <IconAddUser color={'var(--button_primary_bg)'} size="34" />
      </button>
    </div>
  )
}
