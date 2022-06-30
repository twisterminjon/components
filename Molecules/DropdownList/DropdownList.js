import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown as SemanticDropdown } from 'semantic-ui-react'

import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import PatientData from '../PatientData/PatientData'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'

import './DropdownList.css'

export default class DropdownList extends Component {
  static propTypes = {
    /** name for the input */
    name: PropTypes.string.isRequired,
    /** The current selected value in the dropdown */
    value: PropTypes.string.isRequired,
    /** Label text for the input selected */
    label: PropTypes.string,
    /** Error text if hasError */
    errorMessage: PropTypes.string,
    /** Flag to determine if errorMessage renders */
    hasError: PropTypes.bool,
    /** True displays REQUIRED above input field */
    required: PropTypes.bool,
    /** If true, the input will shown in display only mode */
    displayOnly: PropTypes.bool,
  }
  static defaultProps = {
    label: '',
    errorMessage: '',
    hasError: false,
    displayOnly: false,
  }

  render() {
    const {
      name,
      label,
      errorMessage,
      hasError,
      required,
      style,
      className,
      displayOnly,
      value,
      defaultValue,
      ...rest
    } = this.props
    if (displayOnly) {
      // value is the id, we need to lookup the text in options.
      const option = rest.options.filter(option => option.key === value)
      // sanity check to make sure we got one
      const displayValue = option.length > 0 ? option[0].text : 'Langauge not found'

      return <PatientData title={label} data={displayValue} />
    }

    const requiredRender = required ? <RequiredLabel /> : ''

    const labelId = name + '-label'
    const inputId = name + '-input'
    const hintId = name + '-hint'

    return (
      <div style={style} className={`dropdown-list ${className}`}>
        <div className="dropdown-list-wrapper">
          <InputLabel label={label} htmlFor={inputId} id={labelId} />
          {requiredRender}
        </div>
        <SemanticDropdown
          value={value}
          error={hasError}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={hintId}
          {...rest}
        />
        <InputMessage message={errorMessage} show={hasError} />
      </div>
    )
  }
}
