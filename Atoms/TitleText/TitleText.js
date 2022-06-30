import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TitleText.css'

export default class TitleText extends Component {
  static propTypes = {
    /** Text for Title */
    title: PropTypes.string.isRequired,
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
    const { title, className, style } = this.props

    return (
      <h3 className={`title-text ${className}`} style={style}>
        {title}
      </h3>
    )
  }
}
