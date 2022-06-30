import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import StatusBubble from '../../Atoms/StatusBubble/StatusBubble'
import DialButton from '../../Atoms/DialButton/DialButton'
import StartMessageButton from '../../Molecules/StartMessageButton/StartMessageButton'
import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import IconEllipsisV from '../../Atoms/Icons/IconEllipsisV'
import IconFlag from '../../Atoms/Icons/IconFlag'
import IconFlagOutline from '../../Atoms/Icons/IconFlagOutline'
import { parsePhoneNumber } from '@shared/helpers'
import { USER_STATUS_LIST, USER_STATUS_BUSY, USER_STATUS_OFFLINE } from '../../../constants'

import './UserCardCaregiver.css'

export default class UserCardCaregiver extends Component {
  static propTypes = {
    /** Can show an odm message button */
    canOdm: PropTypes.bool,
    /** Can show a secure message button */
    canMessage: PropTypes.bool,
    /** Can show a call button */
    canCall: PropTypes.bool,
    /** Can show a remove button */
    showMenuButton: PropTypes.bool,
    /** User's name to display in card */
    displayName: PropTypes.string.isRequired,
    /** Can show the Users phone number */
    phone: PropTypes.string,
    /** Url to profile image for the user */
    profileImage: PropTypes.string,
    /** User's availability state */
    status: PropTypes.oneOfType([PropTypes.oneOf(USER_STATUS_LIST), PropTypes.oneOf([''])]),
    /** Can send program events to the caregiver */
    sendProgramEvents: PropTypes.bool.isRequired,
    /** Can display a loading spinner */
    loading: PropTypes.bool,
    /** The user can be dialed, this is part of the click2call feature and overrides the user status */
    dialStatus: PropTypes.oneOfType([PropTypes.oneOf(USER_STATUS_LIST), PropTypes.oneOf([''])]),
    /** Function called after the call button is clicked */
    onCall: PropTypes.func,
    /** Function called after the message button is clicked */
    onMessage: PropTypes.func,
    /** Function called after the odm button is clicked */
    onOdm: PropTypes.func,
    /** Function called after the remove button is clicked */
    onMenu: PropTypes.func,
    /** Called after the card is clicked */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    canOdm: false,
    canMessage: false,
    canCall: false,
    dialStatus: USER_STATUS_OFFLINE,
    phone: '',
    profileImage: '',
    status: '',
    favorite: false,
    loading: false,

    onMessage: () => {},
    onOdm: () => {},
    onMenu: () => {},
    onClick: () => {},
  }

  render() {
    const {
      canOdm,
      sendProgramEvents,
      canCall,
      canMessage,
      showMenuButton,
      displayName,
      phone,
      profileImage,
      status,
      loading,
      dialStatus,
      onOdm,
      onCall,
      onMessage,
      onMenu,
      onClick,
    } = this.props

    const formattedPhone = parsePhoneNumber(phone).formattedWithCode

    const dimmed = status === USER_STATUS_OFFLINE || status === USER_STATUS_BUSY

    const spinnerClass = loading ? 'usercardcaregiver--loading button-spinner' : ''

    const disabledValue = status === USER_STATUS_OFFLINE || status === USER_STATUS_BUSY

    return (
      <li
        className={`usercardcaregiver ${spinnerClass}`.trim()}
        data-testid={`caregiver-card-${displayName}`}
        onClick={() => {
          return disabledValue ? null : onClick()
        }}>
        {showMenuButton && (
          <ButtonIcon onClick={onMenu} style={{ marginLeft: 6 }} data-testid={`menu-${displayName}`}>
            <IconEllipsisV color="white" size={25} />
          </ButtonIcon>
        )}

        <div className="usercardcaregiver-avatar" style={{ marginRight: 14, marginLeft: showMenuButton ? 3 : 12 }}>
          <Avatar imgUrl={profileImage} size={45} dimmed={dimmed} />
          {status === '' ? null : <StatusBubble className="usercardcaregiver-status" status={status} />}
        </div>
        <div className="usercardcaregiver-name column">
          <span style={{ opacity: dimmed ? 0.5 : 1 }} data-testid={`name-${displayName}`}>
            {displayName}
          </span>

          <span style={{ opacity: dimmed ? 0.75 : 1 }} data-testid={`phone-${displayName}`}>
            {formattedPhone}
          </span>
        </div>

        <div className="usercardcaregiver-flag">
          <span data-testid={`send-mssage-event-${displayName}`}>
            {sendProgramEvents ? <IconFlag color={'var(--brandcolor)'} /> : <IconFlagOutline />}
          </span>
        </div>

        {canOdm && (
          <StartMessageButton
            style={{ marginRight: 14 }}
            type="ondemand"
            onClick={e => {
              e.stopPropagation()
              onOdm()
            }}
            data-testid={`odm-${displayName}`}
            disabled={loading}
          />
        )}
        {canCall && (
          <DialButton
            style={{ marginRight: 14 }}
            status={dialStatus}
            ghost={false}
            onClick={e => {
              e.stopPropagation()
              onCall()
            }}
            data-testid={`call-${displayName}`}
            disabled={loading}
          />
        )}
        {canMessage && (
          <StartMessageButton
            style={{ marginRight: 14 }}
            onClick={e => {
              e.stopPropagation()
              onMessage()
            }}
            data-testid={`secure-message-${displayName}`}
            disabled={loading}
          />
        )}
      </li>
    )
  }
}
