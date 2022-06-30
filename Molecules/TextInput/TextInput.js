import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import TextInputField from '../../Atoms/TextInputField/TextInputField'
import HintButton from '../../Atoms/HintButton/HintButton'
import HintText from '../../Atoms/HintText/HintText'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'
import PatientData from '../PatientData/PatientData'

import './TextInput.css'

export default class TextInput extends Component {
  static propTypes = {
    /** name for the input, used for associating to the label */
    name: PropTypes.string.isRequired,
    /** Type of input, default is 'text' */
    type: PropTypes.string,
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
    /** If provided a hint button be displayed and this message will open in a popup */
    hintMessage: PropTypes.string,
    /** Hint text display above the input */
    hintText: PropTypes.string,
    /** If true will display REQUIRED above input field */
    required: PropTypes.bool,
    /** If true, the input will shown in display only mode */
    displayOnly: PropTypes.bool,
    /** Additional component attached to Input */
    attachedComponent: PropTypes.node,
    /** Function to call when key is pressed */
    onKeyPress: PropTypes.func,
    /** Alert Message*/
    alertMessage: PropTypes.string,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    name: '',
    type: 'text',
    label: '',
    value: '',
    placeholder: '',
    errorMessage: '',
    hasError: false,
    onChange: () => {},
    hintMessage: '',
    hintText: '',
    required: false,
    displayOnly: false,
    alertMessage: '',
    onKeyPress: () => {},
    className: '',
    style: {},
  }

  render() {
    const {
      type,
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
      displayOnly,
      attachedComponent,
      onKeyPress,
      alertMessage,
      className,
      style,
      ...rest
    } = this.props

    const dataTestId = this.props['data-testid'] ? this.props['data-testid'] : `input-${name}`

    if (displayOnly)
      return (
        <PatientData
          title={label}
          data={value}
          alertMessage={alertMessage}
          // data-testid={dataTestId}
          data-testid={name}
        />
      )

    // Semantic doesn't pass down the className prop so the only
    // way to override is via a style.
    const hintButton = {
      position: 'absolute',
      float: 'right',
      right: '10px',
      top: '48px',
    }

    const requiredRender = required ? <RequiredLabel data-testid={`${dataTestId}-required`} /> : ''

    const hint =
      hintMessage !== '' ? (
        <HintButton message={hintMessage} style={hintButton} data-testid={`${dataTestId}-hint-button`} />
      ) : null

    const labelId = name + '-label'
    const inputId = name + '-input'
    const hintId = name + '-hint'

    return (
      <div className={`textinput-wrapper ${className}`} style={style}>
        <div className="textinput-label-wrapper">
          <InputLabel label={label} htmlFor={inputId} id={labelId} data-testid={`${dataTestId}-label`} />
          <HintText hint={hintText} rightAlign={true} id={hintId} data-testid={`${dataTestId}-hint`} />
          {requiredRender}
        </div>

        <TextInputField
          name={name}
          type={type}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          value={value}
          placeholder={placeholder}
          hasError={hasError}
          onChange={onChange}
          label={attachedComponent}
          onKeyPress={onKeyPress}
          data-testid={`${dataTestId}-input`}
          {...rest}
        />
        {hint}
        <InputMessage message={errorMessage} show={hasError} data-testid={`${dataTestId}-validation-message`} />
      </div>
    )
  }
}
