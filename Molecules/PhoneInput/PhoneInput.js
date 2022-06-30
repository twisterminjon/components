import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import InputPhoneBase from '@shared/components/src/Atoms/InputPhoneBase/InputPhoneBase'
import { getFormattedPhone } from '@shared/helpers'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import HintText from '../../Atoms/HintText/HintText'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'
import HintButton from '../../Atoms/HintButton/HintButton'
import PatientData from '../PatientData/PatientData'

import countrySelectStyles from './CountrySelect.module.css'
import styles from './PhoneInput.module.css'

export default class PhoneInput extends Component {
  static propTypes = {
    /** name for the input, used for associating to the label */
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
    onChange: PropTypes.func.isRequired,
    /** If provided a hint button be displayed and this message will open in a popup */
    hintMessage: PropTypes.string,
    /** Hint text display above the input */
    hintText: PropTypes.string,
    /** If true will display REQUIRED above input field */
    required: PropTypes.bool,
    /** A PhoneInput can be disabled */
    disabled: PropTypes.bool,
    /** If true, the input will shown in display only mode */
    displayOnly: PropTypes.bool,
    /** Function to call when key is pressed */
    onKeyPress: PropTypes.func,
    /** Function to call on blur */
    onBlur: PropTypes.func,
    /** Function to call when the input value initializes */
    onValueInit: PropTypes.func,
    /** Alert Message*/
    alertMessage: PropTypes.string,
  }
  static defaultProps = {
    value: '',
    label: '',
    placeholder: '',
    errorMessage: '',
    hasError: false,
    hintMessage: '',
    hintText: '',
    required: false,
    disabled: false,
    displayOnly: false,
    alertMessage: '',
    onKeyPress: () => {},
    onValueInit: () => {},
    onBlur: () => {},
  }

  isValueInitialized = false

  handleDefaultValueChanged() {
    if (!this.isValueInitialized && !this.props.disabled) {
      this.props.onValueInit()
      this.isValueInitialized = true
    }
  }

  componentDidMount() {
    this.handleDefaultValueChanged()
  }

  componentDidUpdate() {
    this.handleDefaultValueChanged()
  }

  render() {
    const {
      value,
      name,
      label,
      errorMessage,
      hintMessage,
      hintText,
      alertMessage,
      hasError,
      required,
      displayOnly,
      className,
      style,
      onValueInit,
      ...rest
    } = this.props

    const dataTestId = rest['data-testid'] || name

    if (displayOnly) {
      const phone = getFormattedPhone(value)
      return <PatientData title={label} data={phone} alertMessage={alertMessage} data-testid={dataTestId} />
    }

    const labelId = dataTestId + '-label'
    const inputId = dataTestId + '-input'
    const hintId = dataTestId + '-hint'

    return (
      <div className={cx(styles.container, className)} style={style}>
        <div className={styles.label}>
          <InputLabel label={label} htmlFor={inputId} id={labelId} data-testid={labelId} />
          <HintText hint={hintText} rightAlign={true} id={hintId} data-testid={hintId} />
          {required && <RequiredLabel data-testid={`${dataTestId}-required`} />}
        </div>
        <InputPhoneBase
          id={inputId}
          value={value}
          name={name}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          className={cx('ui input fluid', styles.content)}
          inputClassName={styles.input}
          selectStyles={countrySelectStyles}
          {...rest}
        />
        {hintMessage && (
          <HintButton
            message={hintMessage}
            style={{
              position: 'absolute',
              float: 'right',
              right: '10px',
              top: '48px',
            }}
            data-testid={`${dataTestId}-hint-button`}
          />
        )}
        <InputMessage message={errorMessage} show={hasError} data-testid={`${dataTestId}-validation-message`} />
      </div>
    )
  }
}
