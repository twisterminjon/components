import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class GroupAvatar extends Component {
  static propTypes = {
    /** ClassName for the wrapper */
    className: PropTypes.string,

    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const { className, style } = this.props

    return (
      <div className="messageavatar">
        <svg
          className={className}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="18"
          viewBox="0 0 25 18">
          <path
            fill="var(--brandcolor_light)"
            fillRule="evenodd"
            d="M7.5 8.854c2.418 0 4.375-1.98 4.375-4.427C11.875 1.98 9.918 0 7.5 0S3.125 1.98 3.125 4.427c0 2.447 1.957 4.427 4.375 4.427zm3 1.265h-.324c-.813.395-1.715.632-2.676.632-.96 0-1.86-.237-2.676-.632H4.5c-2.484 0-4.5 2.04-4.5 4.554v1.138c0 1.047.84 1.897 1.875 1.897h11.25c1.035 0 1.875-.85 1.875-1.897v-1.138c0-2.514-2.016-4.554-4.5-4.554zm8.25-1.265c2.07 0 3.75-1.7 3.75-3.794 0-2.095-1.68-3.795-3.75-3.795-2.07 0-3.75 1.7-3.75 3.795 0 2.094 1.68 3.794 3.75 3.794zm1.875 1.265h-.148c-.543.19-1.118.316-1.727.316-.61 0-1.184-.126-1.727-.316h-.148c-.797 0-1.531.233-2.176.609.953 1.04 1.551 2.419 1.551 3.945v1.517c0 .087-.02.17-.023.253h6.898c1.035 0 1.875-.85 1.875-1.897 0-2.447-1.957-4.427-4.375-4.427z"
          />
        </svg>
      </div>
    )
  }
}
