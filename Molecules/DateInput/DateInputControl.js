import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DateInputControl extends Component {
  static propTypes = {
    /** id for the input */
    id: PropTypes.string.isRequired,
    /** Name of the control */
    name: PropTypes.string.isRequired,
    /** Placeholder for the input */
    inputPlaceholder: PropTypes.string,
    /** If true, will render in an error state */
    hasError: PropTypes.bool,
  }
  static defaultProps = {
    hasError: false,
  }

  render() {
    const {
      id,
      name,
      hasError,
      inputPlaceholder,
      // these come from the datepicker
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      value,
    } = this.props

    const errorClass = hasError ? 'dateinput--has-error' : ''

    // return <Input error={hasError} fluid {...rest} />
    return (
      <input
        id={id}
        placeholder={inputPlaceholder}
        type="text"
        className={`dateinput ${errorClass}`}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        value={value}
        data-testid={`${name}-input`}
      />
    )
  }
}
