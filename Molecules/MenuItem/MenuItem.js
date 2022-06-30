import React from 'react'
import PropTypes from 'prop-types'

import NotificationBadge from '../../Atoms/NotificationBadge/NotificationBadge'

import './MenuItem.css'

MenuItem.propTypes = {
  /** Can show a loading indicator */
  loading: PropTypes.bool,

  /** Label text of item */
  label: PropTypes.string.isRequired,

  /** Can display a badge with a count, if 0 or not provided, badge will be hidden */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Called after the item is clicked */
  onClick: PropTypes.func,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

MenuItem.defaultProps = {
  loading: false,
  count: null,
  className: '',
  style: {},
}

export default function MenuItem({ loading, label, count, onClick, className, style }) {
  return (
    <button
      className={`menuitem  ${className} ${loading ? 'button-spinner' : ''}`.trim()}
      onClick={onClick}
      style={style}
      data-testid={`button-menu-${label}`}>
      <span className="menuitem-label">{label}</span>
      {count > 0 && <NotificationBadge count={count} />}
    </button>
  )
}
