import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditProgramButton from '../../Atoms/EditProgramButton/EditProgramButton'
import IconSquareOpenSmall from '../../Atoms/Icons/IconSquareOpenSmall'
import IconCheckSmall from '../../Atoms/Icons/IconCheckSmall'

import './ProgramTag.css'

const renderCheckboxIcon = (value, disabled) => {
  const iconStyle = {
    display: 'block',
  }
  return (
    <React.Fragment>
      {!value && (
        <IconSquareOpenSmall
          style={iconStyle}
          color={disabled ? 'var(--checkbox__icon_disabled_fg)' : 'var(--checkbox__icon_enabled_fg)'}
        />
      )}
      {value && (
        <IconCheckSmall
          style={iconStyle}
          color={disabled ? 'var(--checkbox__icon_disabled_fg)' : 'var(--checkbox__icon_enabled_fg)'}
        />
      )}
    </React.Fragment>
  )
}

export default class ProgramTag extends Component {
  static propTypes = {
    /** Text to display in the tag */
    label: PropTypes.string.isRequired,
    /** id of the item being displayed */
    id: PropTypes.string.isRequired,
    /** The id of the enrollment */
    enrollmentId: PropTypes.string.isRequired,
    /** A tag can display an inactive state */
    inActive: PropTypes.bool,
    /** Called when the edit button is clicked */
    onEdit: PropTypes.func.isRequired,
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
    /** Can show a loading spinner */
    loading: PropTypes.bool,
    /** Represents if program is completed */
    isComplete: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false,
    className: '',
    style: {},
  }

  state = {
    inActive: false,
  }

  handleEdit = () => {
    this.props.onEdit(this.props.enrollmentId, this.props.id, this.props.label)
  }

  render() {
    const { label, inActive, className, style, loading, isComplete } = this.props

    const loadingClass = loading ? 'programtag--loading button-spinner' : ''
    const inActiveClass = inActive ? 'programtag--inactive' : ''

    return (
      <div
        className={`programtag programtag--fluid ${inActiveClass} ${loadingClass} ${className}`}
        style={style}
        data-testid={`programtag-${label}`}>
        <div className="programtag-checkboxcontainer">{renderCheckboxIcon(isComplete, inActive)}</div>
        <div className="programtag-textcontainer">
          <span data-testid={`programtag-${label}-text`}>{label}</span>
        </div>
        <EditProgramButton
          onClick={() => this.handleEdit()}
          className="programtag-button"
          data-testid={`programtag-${label}-edit-button`}
          disabled={loading}
        />
      </div>
    )
  }
}
