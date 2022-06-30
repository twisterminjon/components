import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import SearchBar from '../../Molecules/SearchBar/SearchBar'
import InterpreterCard from './InterpreterCard'

import './Interpreters.css'

Interpreters.propTypes = {
  /** Array of languages to display */
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  /** Function called when the call button is clicked */
  onStartCall: PropTypes.func.isRequired,
}

Interpreters.defaultProps = {
  languages: [],
}

export default function Interpreters({ languages, onStartCall }) {
  const [search, setSearch] = useState('')

  const filteredLanguages = useMemo(() => {
    const filter = search.toLowerCase()

    return languages.filter(({ name }) => name.toLowerCase().indexOf(filter) !== -1)
  }, [languages, search])

  return (
    <div className="interpreters-wrap" data-testid="languages-page">
      <SearchBar onChange={setSearch} value={search} />
      {filteredLanguages.length === 0 ? (
        <p className="interpreters-empty" data-testid="interpreters-empty">
          No interpreters found...
        </p>
      ) : (
        filteredLanguages.map(({ id, name }) => (
          <InterpreterCard key={id} name={name} onClick={() => onStartCall(id)} disabled={false} />
        ))
      )}
    </div>
  )
}
