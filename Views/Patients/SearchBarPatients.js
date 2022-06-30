import React from 'react'
import PropTypes from 'prop-types'

import AddButton from '../../Atoms/AddButton/AddButton'
import SearchBar from '../../Molecules/SearchBar/SearchBar'
import './Patients.css'

SearchBarPatients.propTypes = {
  /** Function called when the search input changes */
  onChange: PropTypes.func.isRequired,

  /** Function called when the add button clicked */
  onAdd: PropTypes.func.isRequired,

  /** Search term */
  value: PropTypes.string.isRequired,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

export default function SearchBarPatients({ onChange, onAdd, value, className, style }) {
  return (
    <div className={`patients-searchbar-wrap ${className}`.trim()} style={style}>
      <SearchBar onChange={onChange} value={value} />
      <AddButton onClick={onAdd} data-testid="patient-add" className="patients-addbutton" />
    </div>
  )
}
