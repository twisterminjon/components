import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import { TimeInput } from 'semantic-ui-calendar-react'
import HintButton from '../../Atoms/HintButton/HintButton'
import HintText from '../../Atoms/HintText/HintText'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'

import './TimeAmPmInput.css'

export default class TimeAmPmInput extends Component {
  static propTypes = {
    /** name for the input */
    name: PropTypes.string.isRequired,
    /** Label text for the input */
    label: PropTypes.string,
    /** Value for the input */
    value: PropTypes.string,
    /** Placeholder for the input */
    placeholder: PropTypes.string,
    /** A message to be displayed with the input for validation/error messages */
    errorMessage: PropTypes.string,
    /** When true the input will change state to show validation has failed */
    hasError: PropTypes.bool,
    /** Function to call when the input value changes */
    onChange: PropTypes.func,
    /** If provide a hint button be displayed and this message will open in a popup */
    hintMessage: PropTypes.string,
    /** Hint text display above the input */
    hintText: PropTypes.string,
    /** If true will display REQUIRED above input field */
    required: PropTypes.bool,
    /** Can display 24 hour or 12 hour format, default is 24 hour */
    timeFormat: PropTypes.oneOf(['24', 'AMPM', 'ampm']),
  }
  static defaultProps = {
    name: '',
    label: '',
    value: '',
    placeholder: '',
    errorMessage: '',
    hasError: false,
    onChange: () => {},
    hintMessage: '',
    hintText: '',
    required: false,
    timeFormat: '24',
  }

  render() {
    const {
      value,
      label,
      placeholder,
      errorMessage,
      hasError,
      onChange,
      hintMessage,
      hintText,
      name,
      required,
      className,
      timeFormat,
      ...rest
    } = this.props

    // Semantic doesn't pass down the className prop so the only
    // way to override is via a style.
    const hintButton = {
      position: 'absolute',
      float: 'right',
      top: '8px',
      right: '6px',
    }

    const requiredRender = required ? <RequiredLabel /> : ''

    const hint =
      hintMessage !== '' ? <HintButton message={hintMessage} style={hintButton} data-testid="hint-button" /> : null

    const testid = rest['data-testid'] ? rest['data-testid'] : label

    const labelId = name + '-label'
    const inputId = name + '-input'
    const hintId = name + '-hint'

    // The timeInput component does not have the 'hasError' property
    // so we need to do it manually
    const hasErrorStyle = hasError
      ? {
          borderColor: '#e0b4b4',
          color: '#9f3a38',
        }
      : {}

    return (
      <div className={`timeampminput-wrapper ${className}`} data-testid={testid}>
        <div className="timeampminput-label-wrapper">
          <InputLabel label={label} htmlFor={inputId} id={labelId} />
          <HintText hint={hintText} rightAlign={true} id={hintId} />
          {requiredRender}
        </div>
        <div style={{ position: 'relative' }}>
          <TimeInput
            name={name}
            id={inputId}
            style={hasErrorStyle}
            aria-labelledby={labelId}
            aria-describedby={hintId}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            iconPosition="left"
            fluid
            timeFormat={timeFormat}
            {...rest}
          />
          {hint}
        </div>
        <InputMessage message={errorMessage} show={hasError} />
      </div>
    )
  }
}
