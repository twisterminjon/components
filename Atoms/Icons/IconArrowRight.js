import React from 'react'
import PropTypes from 'prop-types'

IconArrowRight.propTypes = {
  /** Style for the icon */
  style: PropTypes.object,
  /** Color for the icon */
  color: PropTypes.string,
  /** The CSS classname */
  className: PropTypes.string,
  /** The size (width & height), in pixels of the SVG */
  size: PropTypes.number,
}

IconArrowRight.defaultProps = {
  size: 25,
  color: 'black',
  className: '',
  style: {},
}

export default function IconArrowRight({ style, color, size, className }) {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 25"
      className={className}>
      <path
        fill={color}
        fillRule="evenodd"
        d="M10.63 1.674l1.238-1.27c.525-.539 1.373-.539 1.892 0l10.847 11.123c.524.538.524 1.408 0 1.94L13.76 24.597c-.525.538-1.373.538-1.892 0l-1.239-1.271c-.53-.544-.519-1.432.023-1.964l6.723-6.572H1.34C.597 14.79 0 14.177 0 13.416v-1.832c0-.761.597-1.374 1.34-1.374h16.035l-6.723-6.572c-.547-.532-.558-1.42-.023-1.964z"
      />
    </svg>
  )
}
