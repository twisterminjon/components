import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import './DeleteButtonTiny.css'

// FIXME: Replace w/ ButtonIconSmall
export default class DeleteButtonTiny extends Component {
  static propTypes = {
    /** Function called when the button is clicked */
    onClick: PropTypes.func,
    /** If true, will show in a disabled this.state. */
    disabled: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    disabled: false,
    className: '',
    style: {},
  }

  render() {
    const { style, onClick, disabled, className, ...rest } = this.props

    return (
      <button
        className={`deletebuttontiny-button ${className}`}
        style={style}
        onClick={onClick}
        disabled={disabled}
        {...rest}>
        <Icon fitted name="delete" />
      </button>
    )
  }
}
