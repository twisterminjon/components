import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../Atoms/Avatar/Avatar'
import StatusBubble from '../../Atoms/StatusBubble/StatusBubble'
import IconCommentSlash from '../../Atoms/Icons/IconCommentSlash'
import { USER_STATUS_LIST } from '../../../constants'

import './PatientCard.css'

export default class PatientCard extends Component {
  static propTypes = {
    /** Name of the user to display */
    userName: PropTypes.string.isRequired,
    /** User profile pic */
    profileImage: PropTypes.string,
    /** function called when the user is clicked */
    onClick: PropTypes.func.isRequired,
    /** If true the card will show a selected state */
    selected: PropTypes.bool,
    /** User's availibility state */
    status: PropTypes.oneOf(USER_STATUS_LIST),
    /** A size for the card, default is medium */
    size: PropTypes.oneOf(['small', 'medium']),
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
    /** Can send sms Flag */
    smsOptOut: PropTypes.bool,
  }
  static defaultProps = {
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
    const { userName, profileImage, size, onClick, selected, status, className, style, showDnc } = this.props
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
        className={`patientcard-button patientcard-button--${size} ${className}`}
        style={wrapperStyle}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="patientcard" data-testid={`list-item-${userName}`}>
          <div className={`patientcard-avatar patientcard-avatar--${size}`} style={{ marginRight: 14 }}>
            <Avatar imgUrl={profileImage} size={avatarSizes[size]} />
            <StatusBubble className={`patientcard-status patientcard-status--${size}`} status={status} />
          </div>
          <span className={`patientcard-label patientcard-label--${size}`}>{userName}</span>
          <span className="patientcard-dnc-flag">{showDnc && <IconCommentSlash color="var(--brandcolor)" />}</span>
        </div>
      </button>
    )
  }
}
