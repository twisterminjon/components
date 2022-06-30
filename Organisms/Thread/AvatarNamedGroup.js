import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MessageBanner.css'

export default class NamedGroupAvatar extends Component {
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
      <div className="messageavatar messageavatar--accent">
        <svg
          className={className}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="16"
          viewBox="0 0 24 16">
          <g fill="var(--brandcolor)" fillRule="evenodd" transform="translate(1 1)">
            <path d="M3.291 7.094c1.21 0 2.195-.984 2.195-2.195 0-1.21-.984-2.194-2.195-2.194-1.21 0-2.194.984-2.194 2.194s.984 2.195 2.194 2.195zm15.36 0c1.21 0 2.195-.984 2.195-2.195 0-1.21-.984-2.194-2.195-2.194-1.21 0-2.194.984-2.194 2.194s.984 2.195 2.194 2.195zM19.75 8.19h-2.195c-.603 0-1.148.243-1.546.638 1.382.757 2.362 2.125 2.575 3.75h2.263c.607 0 1.097-.49 1.097-1.097v-1.097c0-1.21-.984-2.194-2.194-2.194zm-8.778 0c2.123 0 3.84-1.718 3.84-3.84S13.094.51 10.971.51c-2.122 0-3.84 1.718-3.84 3.84s1.718 3.84 3.84 3.84zm2.634 1.097h-.285c-.713.343-1.505.549-2.349.549-.843 0-1.632-.206-2.348-.549h-.285c-2.18 0-3.95 1.77-3.95 3.95v.987c0 .909.738 1.646 1.646 1.646h9.875c.908 0 1.645-.737 1.645-1.646v-.987c0-2.18-1.769-3.95-3.95-3.95zm-7.67-.46c-.398-.394-.943-.637-1.546-.637H2.194C.984 8.19 0 9.175 0 10.385v1.097c0 .607.49 1.097 1.097 1.097h2.26c.216-1.625 1.196-2.993 2.578-3.75z" />
          </g>
        </svg>
      </div>
    )
  }
}
