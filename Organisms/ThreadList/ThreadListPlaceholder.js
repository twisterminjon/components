import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThreadListCardPlaceholder from './ThreadListCardPlaceholder'

import './ThreadList.css'

export default class ThreadListPlaceholder extends Component {
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

    let placeholderRender = []
    for (let i = 0; i < 10; i++) {
      let time = i * 0.5

      placeholderRender.push(<ThreadListCardPlaceholder delay={time} className={className} key={time} />)
    }

    return (
      <div className={`messagelist-list ${className}`} style={style}>
        {placeholderRender}
      </div>
    )
  }
}
