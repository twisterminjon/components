import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './IconsNavbar.css'

export default class IconsNavbar extends Component {
  static propTypes = {
    /** Name of the icon */
    name: PropTypes.oneOf(['home', 'staff', 'patients', 'message', 'calls']),

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
    const { name, className, style } = this.props

    const icons = {
      home: (
        <g fillRule="evenodd">
          <path d="M7.06,20.58V16.11a.84.84,0,0,1,.32-.52l2.56-2.23,7-6.12,1.29-1.11a.34.34,0,0,1,.48,0,.12.12,0,0,1,.05,0l5.67,4.94,5.25,4.58a.81.81,0,0,1,.31.67v8.56A1,1,0,0,1,28.86,26h-6c-.73,0-1-.33-1-1.12V19.3a1.6,1.6,0,0,0-.24-1,.75.75,0,0,0-.42-.3,4.45,4.45,0,0,0-1-.08H16.35c-.86,0-1.23.21-1.22,1.22V25a.87.87,0,0,1-.23.75.93.93,0,0,1-.75.29H7.91a.94.94,0,0,1-.67-.29A.91.91,0,0,1,7,25V20.56Z" />
          <path d="M18.65,0a3.15,3.15,0,0,1,.82.36c.64.48,1.24,1,1.84,1.57q3.51,3.15,7,6.34c1.39,1.26,2.76,2.51,4.13,3.78.73.67.78.9.1,1.77a9.59,9.59,0,0,1-.81.88.66.66,0,0,1-1.11,0l-4.8-4.34L21.14,6.15,19.09,4.29a.81.81,0,0,0-1.24,0L14,7.74,7,14.07c-.25.23-.52.46-.8.68a.56.56,0,0,1-.79,0,5.69,5.69,0,0,1-1.37-1.68.5.5,0,0,1,.06-.59c.42-.43.84-.89,1.3-1.31L15,2.48c.67-.59,1.3-1.2,2-1.79A2.56,2.56,0,0,1,18.65,0Z" />
        </g>
      ),
      message: (
        <path
          fillRule="evenodd"
          d="M27.99 22.065c1.264-1.504 2.01-3.338 2.01-5.323 0-3.872-2.829-7.187-6.838-8.57.048.381.07.769.07 1.162 0 6.129-5.696 11.11-12.692 11.11-.57 0-1.127-.045-1.676-.11C10.529 23.664 14.443 26 19 26c2.17 0 4.183-.532 5.887-1.446 1.152.735 2.755 1.446 4.69 1.446.17 0 .323-.11.386-.276a.498.498 0 0 0-.08-.505c-.015-.016-1.184-1.4-1.892-3.154m-6.173-12.78C21.818 4.155 16.935 0 10.91 0 4.883 0 0 4.155 0 9.285c0 1.992.739 3.825 1.994 5.34C1.29 16.378.13 17.771.116 17.787a.5.5 0 0 0-.08.506c.07.174.216.278.384.278 1.919 0 3.509-.714 4.652-1.451a12.299 12.299 0 0 0 5.838 1.451c6.025 0 10.908-4.155 10.908-9.286"
          transform="translate(4)"
        />
      ),
      patients: (
        <g fillRule="evenodd">
          <path d="M12.19 14.779c.81-.135 1.674-.07 2.593.196.91.263 1.771.483 2.727.483.537 0 1.065-.052 1.575-.155.6 4.625 4.363 8.259 9.05 8.66C28.052 25.101 27.132 26 26.014 26H8.988c-1.174 0-2.128-.99-2.128-2.205l.005-2.512c0-3.28 2.303-5.978 5.324-6.504zM17.504 0c3.078 0 5.62 2.449 6.025 5.629-2.417 1.582-4.105 4.18-4.46 7.187-.499.143-1.023.22-1.565.22-3.357 0-6.079-2.918-6.079-6.518 0-3.601 2.722-6.518 6.08-6.518z" />
          <path d="M29 6c4.418 0 8 3.582 8 8s-3.582 8-8 8c-4.419 0-8-3.582-8-8s3.581-8 8-8zm1 2h-2c-.553 0-1 .448-1 1v3h-3c-.553 0-1 .448-1 1v2c0 .552.447 1 1 1h3v3c0 .552.447 1 1 1h2c.552 0 1-.448 1-1v-3h3c.552 0 1-.448 1-1v-2c0-.552-.448-1-1-1l-3-.001V9c0-.552-.448-1-1-1zM9 14.018C8.397 13.388 7.57 13 6.655 13H3.328C1.492 13 0 14.569 0 16.5v1.749C0 19.217.743 20 1.664 20H5.09c.329-2.592 1.815-4.774 3.91-5.982M4.5 12C6.43 12 8 10.43 8 8.5 8 6.568 6.43 5 4.5 5S1 6.569 1 8.5C1 10.43 2.57 12 4.5 12" />
        </g>
      ),
      staff: (
        <path d="M22 14.655v2.488c1.711.376 3 2.022 3 3.981v2.118c0 .386-.254.722-.606.799l-1.507.324c-.204.046-.399-.096-.442-.32l-.144-.798c-.043-.217.087-.436.295-.476l.903-.198v-1.449c0-3.187-4.499-3.305-4.499.098v1.355l.905.199c.2.046.333.258.295.477l-.145.797c-.043.219-.239.36-.44.321l-1.463-.214c-.37-.057-.647-.396-.647-.807v-2.226c0-1.959 1.289-3.6 2.999-3.98v-2.295c-.102.034-.205.055-.308.095-.844.32-1.75.498-2.691.498-.943 0-1.847-.178-2.69-.498-.348-.13-.7-.213-1.06-.263v4.145c1.083.348 1.875 1.425 1.875 2.71 0 1.569-1.177 2.843-2.626 2.843-1.447 0-2.624-1.274-2.624-2.843 0-1.285.792-2.362 1.875-2.71v-4.084C9.273 15.285 7 18.067 7 21.45v2.276C7 24.98 7.942 26 9.1 26h16.8c1.158 0 2.1-1.02 2.1-2.274V21.45c0-3.655-2.663-6.618-6-6.795M11.875 21.53c0 .675.502 1.219 1.125 1.219s1.125-.544 1.125-1.219c0-.674-.502-1.219-1.125-1.219s-1.125.545-1.125 1.22M17.499 13c3.315 0 6-2.909 6-6.5S20.814 0 17.5 0c-3.313 0-5.998 2.909-5.998 6.5s2.685 6.5 5.998 6.5M26 14.018c.603-.63 1.43-1.018 2.345-1.018h3.327C33.508 13 35 14.569 35 16.5v1.749c0 .968-.743 1.751-1.664 1.751H29.91c-.329-2.592-1.815-4.774-3.91-5.982M30.5 12c-1.93 0-3.5-1.57-3.5-3.5C27 6.568 28.57 5 30.5 5S34 6.569 34 8.5c0 1.93-1.57 3.5-3.5 3.5M9 14.018C8.397 13.388 7.57 13 6.655 13H3.328C1.492 13 0 14.569 0 16.5v1.749C0 19.217.743 20 1.664 20H5.09c.329-2.592 1.815-4.774 3.91-5.982M4.5 12C6.43 12 8 10.43 8 8.5 8 6.568 6.43 5 4.5 5S1 6.569 1 8.5C1 10.43 2.57 12 4.5 12" />
      ),
      calls: (
        <path
          fillRule="evenodd"
          d="M2.085 10.5C.575 7.765 0 5.558 0 4.068c0-1.49.366-1.918.738-2.263C1.109 1.459 2.785.426 3.07.233 3.356.04 4.445-.334 5.128.649c.684.983 1.97 2.956 2.857 4.267 1.392 1.857.283 2.672-.075 3.16-.659.9-1.038 1.122-1.038 2.226 0 1.103 3.085 4.24 3.823 5.013.732.766 3.806 3.461 4.758 3.605.96.146 2.244-.87 2.517-1.128 1.389-1.066 2.173-.257 2.813.094.64.351 3.53 2.153 4.426 2.76.843.607.79 1.545.79 1.545s-1.739 2.76-1.95 3.091c-.263.387-.895.718-2.318.718s-2.943-.26-6.555-2.247c-2.956-1.625-5.774-4.171-7.25-5.661-1.528-1.49-4.116-4.465-5.84-7.591z"
        />
      ),
    }

    return (
      <svg
        style={style}
        className={`iconsnavbar ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        width={name === 'calls' ? 26 : 37}
        height={26}
        viewBox={name === 'calls' ? `0 0 26 26` : `0 0 37 26`}>
        {icons[name]}
      </svg>
    )
  }
}
