import React from 'react'
import PropTypes from 'prop-types'
import IconChevronLeft from '../../Atoms/Icons/IconChevronLeft'
import './GroupHeader.css'

GroupHeader.propTypes = {
  /** The group name being displayed */
  name: PropTypes.string.isRequired,
  /** function called when the group name / back button is clicked */
  onClick: PropTypes.func.isRequired,
}

export default function GroupHeader({ name, onClick }) {
  return (
    <div className="groupheader-wrap">
      <button className="groupheader-backbutton-container" onClick={onClick}>
        <IconChevronLeft color="var(--grouppage__header_fg)" />
      </button>
      <div className="groupheader-groupname-container">
        <span className="groupheader-groupname">{name}</span>
      </div>
    </div>
  )
}
