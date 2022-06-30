import React from 'react'
import PropTypes from 'prop-types'

IconSquareHalfFull.propTypes = {
  /** Style for the icon */
  style: PropTypes.object,
  /** Color for the icon */
  color: PropTypes.string,
}

IconSquareHalfFull.defaultProps = {
  style: {},
  color: 'var(--checkbox__icon_enabled_fg)',
}

export default function IconSquareHalfFull({ style, color }) {
  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
      <path
        fill={color}
        fillRule="evenodd"
        d="M13.393 0c.838 0 1.526.642 1.6 1.46l.007.147v11.786c0 .838-.642 1.526-1.46 1.6l-.147.007H1.607c-.838 0-1.526-.642-1.6-1.46L0 13.392V1.607C0 .77.642.081 1.46.007L1.608 0h11.786zm-1.179 1.5H7.2v12h5.015c.71 0 1.286-.576 1.286-1.286V2.786c0-.71-.576-1.286-1.286-1.286z"
      />
    </svg>
  )
}
