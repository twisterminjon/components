import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'semantic-ui-react'

import TagUsers from '../TagUser/TagUsers'
import InputMessage from '../../Atoms/InputMessage/InputMessage'

import './TagUserInput.css'

TagUserInput.propTypes = {
  /** Value for the search input */
  value: PropTypes.string,

  /** Users to display */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    })
  ),

  /** A message to be displayed with the input for validation/error messages */
  errorMessage: PropTypes.string,

  /** When true the input will change state to show validation has failed */
  hasError: PropTypes.bool,

  /** Called when search bar input changes */
  onSearch: PropTypes.func.isRequired,

  /** Called after a user is clicked */
  onRemove: PropTypes.func.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

TagUserInput.defaultProps = {
  errorMessage: '',
  hasError: false,
  value: '',
  className: '',
  style: {},
}

export default function TagUserInput({ value, users, errorMessage, hasError, onRemove, onSearch, className, style }) {
  return (
    <div className={`taguserinput ${className}`.trim()} style={style}>
      <Input
        value={value}
        placeholder="Find someone to add..."
        onChange={onSearch}
        className="taguserinput-input"
        data-testid="find-user-input"
        error={hasError}
      />
      <TagUsers onRemove={onRemove} users={users} />
      <InputMessage message={errorMessage} show={hasError} />
    </div>
  )
}
