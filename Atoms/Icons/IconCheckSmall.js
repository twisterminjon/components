import React from 'react'
import PropTypes from 'prop-types'

export default function IconCheckSmall({ style, color, size }) {
  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 15 13">
      <path
        fill={color}
        fillRule="evenodd"
        d="M5.095 11.976L.22 7.008a.775.775 0 0 1 0-1.081l1.06-1.081a.74.74 0 0 1 1.061 0l3.284 3.347 7.034-7.17a.74.74 0 0 1 1.06 0l1.061 1.082a.775.775 0 0 1 0 1.08l-8.625 8.791a.74.74 0 0 1-1.06 0z"
      />
    </svg>
  )
}

IconCheckSmall.propTypes = {
  /** Style for the icon */
  style: PropTypes.object,
  /** Color for the icon */
  color: PropTypes.string,
  /** Size for the icon */
  size: PropTypes.number,
}

IconCheckSmall.defaultProps = {
  style: {},
  color: 'var(--checkbox__icon_enabled_fg)',
  size: 15,
}
