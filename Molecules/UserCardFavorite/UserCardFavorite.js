import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import StatusBubble from '../../Atoms/StatusBubble/StatusBubble'
import FavoriteCardMenu from '../../Molecules/FavoriteCardMenu/FavoriteCardMenu'
import { USER_STATUS_LIST, USER_STATUS_AVAILABLE, USER_STATUS_BUSY, USER_STATUS_OFFLINE } from '../../../constants'

import './UserCardFavorite.css'

export default class UserCardFavorite extends Component {
  static propTypes = {
    /** The username to display */
    userName: PropTypes.string.isRequired,
    /** Url to the users profile image */
    profileImage: PropTypes.string,
    /** Availability status for the user */
    status: PropTypes.oneOf(USER_STATUS_LIST).isRequired,
    /** use menu, if false the default behavior of onClick is onCall */
    useMenu: PropTypes.bool.isRequired,
    /** Virtual calling can be enabled */
    virtualCallsEnabled: PropTypes.bool,
    /** Secure messaging can be enabled */
    messagesEnabled: PropTypes.bool,
    /** Start a call */
    onCall: PropTypes.func.isRequired,
    /** Send a messaged */
    onMessage: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const {
      userName,
      status,
      profileImage,
      useMenu,
      virtualCallsEnabled,
      messagesEnabled,
      onCall,
      onMessage,
      className,
      style,
    } = this.props

    const dimmed = status === USER_STATUS_AVAILABLE ? false : true

    const favDisabled = status === USER_STATUS_BUSY || status === USER_STATUS_OFFLINE
    const disabledHoverClass = favDisabled ? '' : 'usercardfavorite-avatar-hover'

    const renderFavButton = (
      <button
        className={`usercardfavorite ${className}`}
        disabled={favDisabled}
        onClick={onCall}
        data-testid={`button-favorite-${userName}`}
        style={style}>
        <div className="usercardfavorite-avatar-container">
          <Avatar imgUrl={profileImage} className={`${disabledHoverClass}`} size={32} dimmed={dimmed} />
          <StatusBubble status={status} className="usercardfavorite-status" />
        </div>
        <span className="usercardfavorite-name">{userName}</span>
      </button>
    )

    if (useMenu)
      return (
        <div
          className={`usercardfavorite-wrap ${className}`}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          data-testid={`fav-${userName}`}
          style={style}>
          <FavoriteCardMenu
            onCall={onCall}
            disableCall={favDisabled || !virtualCallsEnabled}
            disableMessages={!messagesEnabled}
            onMessage={onMessage}
            testidLabel={userName}
          />
          {renderFavButton}
        </div>
      )

    return <React.Fragment>{renderFavButton}</React.Fragment>
  }
}
