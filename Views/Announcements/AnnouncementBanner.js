import React from 'react'
import PropTypes from 'prop-types'

import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import IconChevronRight from '../../Atoms/Icons/IconChevronRight'
import IconChevronUp from '../../Atoms/Icons/IconChevronUp'
import IconChevronDown from '../../Atoms/Icons/IconChevronDown'
import IconTimes from '../../Atoms/Icons/IconTimes'

import './AnnouncementBanner.css'

AnnouncementBanner.propTypes = {
  /** The text content of the banner */
  text: PropTypes.string.isRequired,

  /** Can show a button for navigation */
  navigation: PropTypes.oneOf(['up', 'down', 'left', 'right', 'times']),

  /** Called after the navigate action */
  onNavigate: PropTypes.func,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

AnnouncementBanner.defaultProps = {
  navigation: null,
  onNavigate: () => {},
  className: '',
  style: {},
}

export default function AnnouncementBanner({ text, navigation, onNavigate, className, style }) {
  const icons = {
    up: <IconChevronUp color="var(--base__body_fg)" />,
    down: <IconChevronDown color="var(--base__body_fg)" />,
    left: <IconChevronLeft color="var(--base__body_fg)" />,
    right: <IconChevronRight color="var(--base__body_fg)" />,
    times: <IconTimes size={16} color="var(--base__body_fg)" />,
  }
  let renderIcon = icons[navigation] || icons.left

  return (
    <div className="announcementbanner">
      {navigation && (
        <ButtonIcon onClick={onNavigate} className="announcementbanner-navigate">
          {renderIcon}
        </ButtonIcon>
      )}
      <h1>{text}</h1>
    </div>
  )
}
