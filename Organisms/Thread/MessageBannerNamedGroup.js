import React from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

import AvatarNamedGroup from './AvatarNamedGroup'
import IconAddUser from '../../Atoms/Icons/IconAddUser'

import './MessageBanner.css'

MessageBanner.propTypes = {
  /** If true, will show add participant button */
  canModifyMembers: PropTypes.bool,

  /** Name of the group */
  groupName: PropTypes.string.isRequired,

  /** List of group members */
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  /** function called after the add/edit action */
  onAdd: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

MessageBanner.defaultProps = {
  canModifyMembers: true,
  className: '',
  style: {},
}

export default function MessageBanner({ canModifyMembers, groupName, members, onAdd, className, style }) {
  const handleAdd = () => {
    onAdd({ editing: true })
  }

  const memberText = `${members.length} Members`
  return (
    <React.Fragment>
      <div className={`messagebanner ${className}`} style={style} data-testid="message-banner">
        <div className="messagebanner-avatar-wrap">
          <AvatarNamedGroup />
        </div>
        <Popup
          inverted
          hoverable
          position="bottom center"
          className="messagebannernamedgroup-member-wrap"
          trigger={
            <div className="messagebannernamedgroup-text-content">
              <span>{groupName}</span>
              <span className="messagebanner-label">{memberText}</span>
            </div>
          }>
          <MemberList members={members} />
        </Popup>
        {canModifyMembers && (
          <button
            className="messagebanner-button messagebanner-adduser-button"
            onClick={handleAdd}
            data-testid="edit-group">
            <IconAddUser color={'var(--button_primary_bg)'} size="34" />
          </button>
        )}
      </div>
    </React.Fragment>
  )
}

const MemberList = ({ members }) => {
  return (
    <div className="messagebannernamedgroup-member-list">
      <h6>{members.length} Group Members</h6>
      {members.map(user => (
        <span key={user.id}>{user.displayName}</span>
      ))}
    </div>
  )
}
