import React, { Component } from 'react'
import PropTypes from 'prop-types'

import userPlaceholder from '../../../Images/user-placeholder.png'

import './Avatar.css'

export default class Avatar extends Component {
  static propTypes = {
    /** Can show a loader */
    loading: PropTypes.bool,
    /** Size for the Avatar */
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['small', 'medium', 'large', 'big', 'huge', 'massive']),
    ]),
    /** The users name */
    displayName: PropTypes.string,
    /** Url to an image to display */
    imgUrl: PropTypes.string,
    /** If true, will display in a dimmed state */
    dimmed: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    loading: false,
    displayName: null,
    size: 'small',
    imgUrl: '',
    dimmed: false,
    className: '',
    style: {},
  }

  render() {
    const { loading, size, imgUrl, displayName, dimmed, className, style, ...rest } = this.props

    const pixelSizes = {
      small: 24,
      medium: 32,
      large: 64,
      big: 96,
      huge: 128,
      massive: 160,
    }

    let sizePx = null
    if (typeof size === 'number') {
      sizePx = size
    } else {
      sizePx = pixelSizes[size]
    }

    const internalStyle = {
      lineHeight: sizePx + 'px',
      width: sizePx + 'px',
      height: sizePx + 'px',
    }

    if (dimmed || loading) internalStyle.opacity = 0.5

    const wrapperStyle = Object.assign({}, internalStyle, style)

    let initials = null
    if (displayName !== null) {
      initials = displayName.charAt(0)
    }

    let display = null
    if (imgUrl === '' && initials) {
      display = <span>{initials}</span>
    } else if (imgUrl === '' && !initials) {
      display = <img alt={'user avatar'} src={userPlaceholder} style={internalStyle} />
    } else {
      display = <img alt={'user avatar'} src={imgUrl} style={internalStyle} />
    }

    const loadingClass = loading ? 'button-spinner' : ''

    return (
      <React.Fragment>
        <div className={`avatar ${loadingClass} ${className}`.trim()} style={wrapperStyle} {...rest}>
          {display}
        </div>
      </React.Fragment>
    )
  }
}
