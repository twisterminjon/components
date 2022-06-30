import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ScrollArrow.css'

// FIXME: this should really be an icon in the icons folder
export default class ScrollArrow extends Component {
  static propTypes = {
    /** Direction for the arrow */
    direction: PropTypes.oneOf(['left', 'right']).isRequired,
  }

  render() {
    const { direction, ...rest } = this.props

    const renderArrow =
      direction === 'left' ? (
        <polygon
          fillRule="evenodd"
          points="0 2.25 2.143 0 15 13.5 2.143 27 0 24.75 10.714 13.5"
          opacity=".5"
          transform="matrix(-1 0 0 1 15 0)"
        />
      ) : (
        <polygon fillRule="evenodd" points="0 2.25 2.143 0 15 13.5 2.143 27 0 24.75 10.714 13.5" opacity=".5" />
      )

    const ariaLabel = direction === 'left' ? 'scroll left' : 'scroll right'

    return (
      <button {...rest} className="scrollarrow-button" aria-label={ariaLabel}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="27" viewBox="0 0 15 27" fill="#00000">
          {renderArrow}
        </svg>
      </button>
    )
  }
}
