import React from 'react'
import PropTypes from 'prop-types'

export default function IconEnvelopeOpen({ color, size, style }) {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fillRule="evenodd">
      <path
        fill={color}
        fillRule="evenodd"
        d="M25 4c0 3.333 0 5-.03
        7.633-.014 1.47-.518 2.296-1.807 2.363L22.99 14H9.01c-1.358
        0-1.918-.765-2.002-2.2L7 11.607V4c2.25 1.842 4.252 3.275 6.225
        4.825C14.5 9.833 15.25 10.3 16 10.3s1.5-.467 2.775-1.475C20.748 7.275
        22.75 5.842 25 4zM6 11v2H3v-2h3zM23.084.072c.682.046 1.747.595 1.885
        1.113a2.605 2.605 0 0 1-.72 2.233c-2.177 1.775-4.49 3.36-6.713
        5.022a2.262 2.262 0 0 1-2.98 0c-2.3-1.707-4.652-3.338-6.897-5.144a2.4
        2.4 0 0 1-.62-2.08A2.23 2.23 0 0 1 8.724.08c2.414-.091 4.843-.053
        7.28-.053 2.36 0 4.727-.084 7.08.045zM6 6v2H1V6h5zm0-5v2H0V1h6z"
      />
    </svg>
  )
}

IconEnvelopeOpen.propTypes = {
  /** Color for the icon */
  color: PropTypes.string,
  /** ClassName for the wrapper */
  size: PropTypes.number,
  /** Style for the wrapper */
  style: PropTypes.object,
}
IconEnvelopeOpen.defaultProps = {
  color: 'black',
  size: 14,
  style: {},
}
