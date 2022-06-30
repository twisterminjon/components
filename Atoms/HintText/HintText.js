import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './HintText.css'

export default class HintText extends Component {
  static propTypes = {
    /** Text for Hint */
    hint: PropTypes.string,
    /** Align to right */
    rightAlign: PropTypes.bool,
  }
  static defaultProps = {
    hint: '',
    rightAlign: false,
  }

  render() {
    const { hint, rightAlign, ...rest } = this.props

    const rightMargin = rightAlign ? { marginLeft: 'auto' } : { marginLeft: 8 }

    return (
      <span className="hinttext" style={rightMargin} {...rest}>
        {hint}
      </span>
    )
  }
}
