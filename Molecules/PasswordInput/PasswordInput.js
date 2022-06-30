import React from 'react'
import PropTypes from 'prop-types'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import TextInputField from '../../Atoms/TextInputField/TextInputField'

import './PasswordInput.css'

const PasswordInput = React.forwardRef(({ label, name, value, errorMessage, hasError, onChange, ...rest }, ref) => {
  const styles = {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
  }

  const labelId = 'password-label'
  const inputId = 'password-input'

  return (
    <div style={styles}>
      <InputLabel label={label} htmlFor={inputId} id={labelId} />
      <TextInputField
        name={name}
        id={name}
        aria-labelledby={labelId}
        value={value}
        hasError={hasError}
        type="password"
        onChange={onChange}
        className="passwordinput-input"
        ref={ref}
        {...rest}
      />
      <InputMessage message={errorMessage} show={hasError} />
    </div>
  )
})

PasswordInput.propTypes = {
  /** Label to display for the input */
  label: PropTypes.string,
  /** Name for the input */
  name: PropTypes.string,
  /** Value for the input */
  value: PropTypes.string,
  /** Error message to display, will only show if hasError is true */
  errorMessage: PropTypes.string,
  /** Show the input in error mode and display message if present */
  hasError: PropTypes.bool,
  /** Function called when the value changes */
  onChange: PropTypes.func.isRequired,
}

PasswordInput.defaultProps = {
  label: 'Password',
  name: 'password',
  value: '',
  errorMessage: '',
  hasError: false,
}

export default PasswordInput
