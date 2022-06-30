import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconPhoneSmall extends Component {
  static propTypes = {
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Color for the icon */
    color: PropTypes.string,
    /** Size for the icon */
    size: PropTypes.string,
  }
  static defaultProps = {
    className: '',
    color: '#8FFF23',
    size: '18',
  }

  render() {
    const { size, color, className } = this.props
    const viewBox = `0 0 ${size} ${size}`

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={viewBox}>
        className={className}
        <path
          fill={color}
          fillRule="evenodd"
          d="M1.444 7.27C.398 5.375 0 3.847 0 2.816c0-1.032.253-1.328.51-1.567C.769 1.009 1.929.295 2.127.16 2.323.028 3.077-.23 3.55.45c.473.68 1.364 2.047 1.978 2.955.964 1.285.196 1.85-.052 2.188-.456.622-.719.776-.719 1.54s2.136 2.935 2.647 3.47c.507.531 2.635 2.397 3.294 2.497.665.1 1.554-.603 1.743-.781.961-.738 1.504-.179 1.947.065.443.243 2.444 1.49 3.064 1.91.584.42.548 1.07.548 1.07l-1.35 2.14c-.183.268-.62.497-1.605.497s-2.038-.18-4.539-1.555c-2.046-1.126-3.997-2.888-5.019-3.92-1.057-1.032-2.85-3.09-4.043-5.255z"
        />
      </svg>
    )
  }
}
