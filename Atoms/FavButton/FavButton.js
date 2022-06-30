import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './FavButton.css'

export default class FavButton extends Component {
  static propTypes = {
    /** If true will display the icon filled */
    filled: PropTypes.bool,
    /** Function for onClick */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    filled: false,
    onClick: () => {},
  }

  render() {
    const { filled, onClick, ...rest } = this.props

    const color = filled ? 'white' : '#979797'
    const fill = filled ? 'white' : 'none'
    const opacity = filled ? '1' : '0.5'

    return (
      <button aria-label="Favorite" className="favbutton-button" onClick={onClick} {...rest}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" hieght="24" viewBox="0 0 25 24">
          <path
            fill={fill}
            stroke={color}
            strokeWidth="1.5px"
            opacity={opacity}
            isolation="isolate"
            d="M12.16,1.82,9.11,7.88l-6.83,1a1.46,1.46,0,0,0-.83,2.5l4.94,4.72L5.22,22.73a1.49,1.49,0,0,0,2.17,1.55l6.11-3.15,6.11,3.15a1.5,1.5,0,0,0,2.17-1.55l-1.17-6.66,4.94-4.72a1.46,1.46,0,0,0-.83-2.5l-6.83-1L14.84,1.82A1.5,1.5,0,0,0,12.16,1.82Z"
            transform="translate(-0.25 -0.25)"
          />
        </svg>
      </button>
    )
  }
}
