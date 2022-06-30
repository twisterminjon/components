import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CallIncoming extends Component {
  static propTypes = {
    /** Color for the icon */
    color: PropTypes.string,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    color: 'black',
    className: '',
  }

  render() {
    const { color, className, style } = this.props

    const wrapperStyle = Object.assign({}, style)

    return (
      <svg
        style={wrapperStyle}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={9}
        viewBox="0 0 20 9"
        fillRule="evenodd">
        <g fill={color}>
          <path
            fillRule="evenodd"
            d="M1.775.225c.237.34.682 1.023.99 1.477.481.643.097.925-.027 1.094-.228.311-.36.388-.36.77S3.448 5.034 3.703 5.3c.253.266 1.317 1.199 1.647 1.248.332.05.777-.3.871-.39.481-.37.753-.09.974.032.221.122 1.222.745 1.532.956.292.21.274.535.274.535l-.675 1.07c-.091.133-.31.248-.803.248-.492 0-1.018-.09-2.269-.778-1.023-.562-1.999-1.444-2.51-1.96C2.216 5.747 1.32 4.717.723 3.635.199 2.687 0 1.924 0 1.408 0 .892.127.744.255.624c.129-.12.709-.477.808-.543.099-.067.476-.197.712.144zm13.952-.08l.446.458a.504.504 0 0 1-.008.707l-2.42 2.366h5.773c.267 0 .482.22.482.494v.66a.487.487 0 0 1-.482.494h-5.773l2.42 2.366a.5.5 0 0 1 .008.707l-.446.458a.472.472 0 0 1-.68 0L11.142 4.85a.502.502 0 0 1 0-.698L15.047.145a.472.472 0 0 1 .68 0z"
          />
        </g>
      </svg>
    )
  }
}
