import React from 'react'
import PropTypes from 'prop-types'
import './EventCard.css'

EventCard.propTypes = {
  /** A label for the event */
  label: PropTypes.string.isRequired,

  /** A date for the event */
  date: PropTypes.string.isRequired,

  /** An icon for the event */
  renderIcon: PropTypes.func.isRequired,

  /** Function called when card clicked */
  onClick: PropTypes.func,

  /** Styles of card */
  wrapperClassName: PropTypes.string,

  /** Styles of text */
  textClassName: PropTypes.string,

  /** Card is loading */
  loading: PropTypes.bool,
}

EventCard.defaultProps = {
  wrapperClassName: '',
  textClassName: '',
  loading: false,
}

export default function EventCard({
  label,
  renderIcon,
  date,
  onClick,
  wrapperClassName,
  textClassName,
  loading,
  ...rest
}) {
  const loadingClass = loading ? 'eventcard-loading button-spinner' : ''
  return (
    <div onClick={onClick} className={`eventcard-container ${wrapperClassName} ${loadingClass}`.trim()} {...rest}>
      <div className="eventcard-content">
        <div className="eventcard-label">
          <div className="eventcard-icon">{renderIcon()}</div>
          <span className={`eventcard-text ${textClassName}`.trim()}>{label}</span>
        </div>
        <span className={`eventcard-text ${textClassName}`.trim()}>{date}</span>
      </div>
      {loading && <div className="eventcard-dimmer"></div>}
    </div>
  )
}
