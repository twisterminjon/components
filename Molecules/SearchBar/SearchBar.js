import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { debounce } from 'lodash-es'

import IconSearch from '../../Atoms/Icons/IconSearch'

import './SearchBar.css'

SearchBar.propTypes = {
  /** Function called when the search input changes */
  onChange: PropTypes.func.isRequired,

  /** Can set focus to input on load */
  focusOnMount: PropTypes.bool,

  /** ClassName for the wrapper */
  className: PropTypes.string,

  /** Style for the wrapper */
  style: PropTypes.object,
}

SearchBar.defaultProps = {
  focusOnMount: true,
  className: '',
  style: {},
}

export default function SearchBar({ onChange, value, focusOnMount, className, style }) {
  const searchInput = useRef(null)

  useEffect(() => {
    if (focusOnMount) searchInput.current.focus()
  }, [focusOnMount])

  const [searchValue, setSearchValue] = useState('')

  // Set search value, preliminary
  const handleChange = useCallback(evt => {
    const value = evt.target.value

    setSearchValue(value)
  }, [])

  // Handle debounced onChanged callback
  useEffect(() => {
    const debounced = debounce(() => {
      onChange(searchValue)
    }, 250)

    debounced()

    return function unmount() {
      debounced.cancel()
    }
  }, [onChange, searchValue])

  return (
    <div className={`searchbar-wrap ${className}`.trim()} style={style} data-testid="search-bar">
      <div className="searchbar-search">
        <div className="searchbar-icon-wrap">
          <IconSearch color="var(--searchbar__icon_fg)" />
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          defaultValue={value}
          className="searchbar-input"
          ref={searchInput}
        />
      </div>
    </div>
  )
}
