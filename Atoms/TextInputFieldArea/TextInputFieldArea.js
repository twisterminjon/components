import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextArea } from 'semantic-ui-react'

import './TextInputFieldArea.css'

export default class TextInputFieldArea extends Component {
  static propTypes = {
    /** If true, will render in an error state */
    hasError: PropTypes.bool,
  }
  static defaultProps = {
    hasError: false,
    className: '',
    style: {},
  }

  render() {
    const { hasError, className, style, ...rest } = this.props

    const errorStatus = hasError ? 'textinputfieldarea-hasError' : 'textinputfieldarea'

    return <TextArea error={errorStatus} className={`${errorStatus} ${className}`} style={style} {...rest} />
  }
}
