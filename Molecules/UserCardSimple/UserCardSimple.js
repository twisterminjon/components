import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import StatusBubble from '../../Atoms/StatusBubble/StatusBubble'
import { USER_STATUS_LIST } from '../../../constants'

import './UserCardSimple.css'

export default class UserCardSimple extends Component {
  static propTypes = {
    /** Name of the user to display */
    userName: PropTypes.string.isRequired,

    /** User profile pic */
    profileImage: PropTypes.string,

    /** function called when the user is clicked */
    onClick: PropTypes.func.isRequired,

    /** If true the card will show a selected state */
    selected: PropTypes.bool,

    /** User's availability state */
    status: PropTypes.oneOf(USER_STATUS_LIST),

    /** The user's status can be hidden */
    hideStatus: PropTypes.bool,

    /** ClassName for the wrapper */
    /** A size for the card, default is medium */
    size: PropTypes.oneOf(['small', 'medium']),

    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    hideStatus: false,
    selected: false,
    size: 'medium',
    className: '',
    style: {},
  }

  state = {
    hovered: false,
  }

  handleMouseEnter = () => {
    this.setState({ hovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  }

  render() {
    const { userName, profileImage, size, onClick, selected, status, hideStatus, className, style } = this.props
    const { hovered } = this.state

    let bgColor = 'transparent'
    if (hovered) bgColor = '#282F3B'
    if (selected) bgColor = '#92AAD7'

    const wrapperStyle = { ...{ backgroundColor: bgColor }, ...style }

    const avatarSizes = {
      small: 36,
      medium: 45,
    }

    return (
      <button
        className={`usercardsimple-button usercardsimple-button--${size} ${className}`}
        style={wrapperStyle}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="usercardsimple" data-testid={`list-item-${userName}`}>
          <div className={`usercardsimple-avatar usercardsimple-avatar--${size}`} style={{ marginRight: 14 }}>
            <Avatar imgUrl={profileImage} size={avatarSizes[size]} />
            {!hideStatus && (
              <StatusBubble className={`usercardsimple-status usercardsimple-status--${size}`} status={status} />
            )}
          </div>
          <span className={`usercardsimple-label usercardsimple-label--${size}`}>{userName}</span>
        </div>
      </button>
    )
  }
}
