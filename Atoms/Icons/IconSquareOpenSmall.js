import React from 'react'
import PropTypes from 'prop-types'

export default function IconSquareOpenSmall({ style, color }) {
  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
      <path
        fill={color}
        fillRule="evenodd"
        d="M13.393 0C14.28 0 15 .72 15 1.607v11.786C15 14.28 14.28 15 13.393 15H1.607C.72 15 0 14.28 0 13.393V1.607C0 .72.72 0 1.607 0zm-1.179 1.5H2.786c-.71 0-1.286.576-1.286 1.286v9.428c0 .71.576 1.286 1.286 1.286h9.428c.71 0 1.286-.576 1.286-1.286V2.786c0-.71-.576-1.286-1.286-1.286z"
      />
    </svg>
  )
}

IconSquareOpenSmall.propTypes = {
  /** Style for the icon */
  style: PropTypes.object,
  /** Color for the icon */
  color: PropTypes.string,
}

IconSquareOpenSmall.defaultProps = {
  style: {},
  color: 'var(--checkbox__icon_enabled_fg)',
}
