import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DateFormat, ProjectDate } from '@shared/helpers'

import DateInputControl from './DateInputControl'
import InputLabel from '../../Atoms/InputLabel/InputLabel'
import InputMessage from '../../Atoms/InputMessage/InputMessage'
import HintText from '../../Atoms/HintText/HintText'
import DatePicker from 'react-datepicker'
import RequiredLabel from '../../Atoms/RequiredLabel/RequiredLabel'
import PatientData from '../../Molecules/PatientData/PatientData'

import 'react-datepicker/dist/react-datepicker.css'
import './DateInput.css'

export default class DateInput extends Component {
  static propTypes = {
    /** Name for the component */
    name: PropTypes.string.isRequired,
    /** Value for the component's label */
    label: PropTypes.string,
    /** Value, a javascript date */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** Placeholder value */
    placeholder: PropTypes.string,
    /** Hint text display above the input */
    hintText: PropTypes.string,
    /** A message to display when the input has an error */
    errorMessage: PropTypes.string,
    /** If true will show the errorMessage and state */
    hasError: PropTypes.bool,
    /** Function called when the input changes */
    onChange: PropTypes.func,
    /** Classname to be used on the wrapper */
    className: PropTypes.string,
    /** Style to be used on the wrapper */
    style: PropTypes.object,
    /** If true, the input will shown in display only mode */
    displayOnly: PropTypes.bool,
    /** If true, clear button is displayed */
    isClearable: PropTypes.bool,
  }
  static defaultProps = {
    label: '',
    value: null,
    placeholder: '',
    hintText: '',
    errorMessage: '',
    hasError: false,
    onChange: () => {},
    className: '',
    style: {},
    displayOnly: false,
    isClearable: true,
  }

  render() {
    const {
      name,
      label,
      value,
      placeholder,
      errorMessage,
      hasError,
      onChange,
      hintText,
      className,
      style,
      required,
      displayOnly,
      isClearable,
      ...rest
    } = this.props

    let dateString = ''
    let dateValue = null
    if (value === '') dateValue = null
    if (value) {
      dateString = ProjectDate(value).format(DateFormat.L)
      dateValue = new Date(value)
      // The date picker is ghetto and uses the javascript internal .toIsoString()
      // So it will reset dates based on the tz offset and you -1 or +1 days
      // Force to use the local tz
      dateValue.setTime(dateValue.getTime() + dateValue.getTimezoneOffset() * 60000)
    }

    if (displayOnly) return <PatientData title={label} data={dateString} />

    const renderRequired = required ? <RequiredLabel /> : ''

    // used for aria labeling
    const labelId = name + '-label'
    const inputId = name + '-input'
    const hintId = name + '-hint'

    return (
      <div className={`dateinput-wrapper ${className}`} style={style}>
        {label && (
          <div className="dateinput-label-wrapper">
            <InputLabel label={label} htmlFor={inputId} id={labelId} style={{ color: 'white' }} data-testid={labelId} />
            <HintText hint={hintText} rightAlign={true} id={hintId} />
            {renderRequired}
          </div>
        )}

        <DatePicker
          name={name}
          id={inputId}
          aria-labelledby={labelId}
          onChange={onChange}
          selected={dateValue}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          isClearable={isClearable}
          customInput={
            <DateInputControl
              id={inputId}
              style={{ width: '100%' }}
              inputPlaceholder={placeholder}
              hasError={hasError}
              name={name}
            />
          }
          {...rest}
        />
        <InputMessage message={errorMessage} show={hasError} />
      </div>
    )
  }
}
