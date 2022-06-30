import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconsPatient from '../../Atoms/IconsPatient/IconsPatient'
import './PatientButton.css'

export default class PatientButton extends Component {
  static propTypes = {
    /** Function for onClick */
    onClick: PropTypes.func,
    /** Disabled */
    disabled: PropTypes.bool,
    /** Icon to show in button */
    icon: PropTypes.oneOf(['edit', 'envelope', 'plus', '']).isRequired,
    /** Label for button */
    label: PropTypes.string.isRequired,
    /** If true, will display in a loading state */
    loading: PropTypes.bool,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    onClick: () => {},
    disabled: false,
    loading: false,
    className: '',
    style: {},
  }

  state = {
    mouseDown: false,
  }

  handleMouseDown = () => {
    if (!this.props.disabled) this.setState({ mouseDown: true })
  }

  handleMouseUp = () => {
    this.setState({ mouseDown: false })
  }

  render() {
    const { name, onClick, disabled, icon, label, loading, style, className, ...rest } = this.props
    const { mouseDown } = this.state

    let onClickBehavior = disabled ? () => {} : onClick

    const buttonClickClass = mouseDown ? 'patientbutton-down' : ''

    const icons = {
      edit: <IconsPatient name="edit" size={12} color="var(--brandcolor)" style={{ marginRight: 4 }} />,
      envelope: <IconsPatient name="envelope" size={12} color="var(--brandcolor)" style={{ marginRight: 4 }} />,
      plus: <IconsPatient name="plus" size={12} color="var(--brandcolor)" style={{ marginRight: 4 }} />,
    }

    const renderIcon = icon ? icons[icon] : null
    const loadingIndicator = loading ? 'patientbutton-loading' : ''

    return (
      <button
        className={`patientbutton-button ${className} ${buttonClickClass} ${loadingIndicator}`}
        onClick={onClickBehavior}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        type="button"
        style={style}
        disabled={loading || disabled ? true : false}
        {...rest}>
        {renderIcon}
        <span>{label}</span>
      </button>
    )
  }
}
