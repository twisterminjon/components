import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import TextInputFieldArea from '../../Atoms/TextInputFieldArea/TextInputFieldArea'
import HintText from '../../Atoms/HintText/HintText'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'
import './TextAreaInput.css'

export default class TextAreaInput extends Component {
  static propTypes = {
    /** name for the input */
    name: PropTypes.string.isRequired,
    /** Label text for the input */
    label: PropTypes.string,
    /** Value for the input */
    value: PropTypes.string,
    /** A message to be displayed with the input for validation/error messages */
    errorMessage: PropTypes.string,
    /** When true the input will change state to show validation has failed */
    hasError: PropTypes.bool,
    /** Function to call when the input value changes */
    onChange: PropTypes.func,
    /** Hint text display above the input */
    hintText: PropTypes.string,
    /** If true will display REQUIRED above input field */
    required: PropTypes.bool,
    /** The text area can show a loading indicator */
    loading: PropTypes.bool,
  }
  static defaultProps = {
    label: '',
    value: '',
    errorMessage: '',
    hasError: false,
    onChange: () => {},
    hintText: '',
    required: false,
    className: '',
    style: {},
    loading: false,
  }

  render() {
    const {
      value,
      label,
      errorMessage,
      hasError,
      onChange,
      hintText,
      name,
      required,
      className,
      style,
      loading,
      ...rest
    } = this.props

    const requiredRender = required ? <RequiredLabel /> : ''

    const labelId = name + '-label'
    const inputId = name + '-input'
    const hintId = name + '-hint'

    const loadingClass = loading ? 'button-spinner' : ''

    return (
      <div className={`textareainput-wrapper ${loadingClass} ${className}`} style={style}>
        <div className="textareainput-label-wrapper">
          {label && <InputLabel label={label} htmlFor={inputId} id={labelId} />}
          {hintText && <HintText hint={hintText} rightAlign={true} id={hintId} />}
          {requiredRender}
        </div>
        <TextInputFieldArea
          name={name}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          value={value}
          hasError={hasError}
          onChange={onChange}
          {...rest}
        />
        <InputMessage message={errorMessage} show={hasError} />
      </div>
    )
  }
}
