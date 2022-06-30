import React from 'react'
import PropTypes from 'prop-types'
import GroupHeader from './GroupHeader'
import GroupFooter from './GroupFooter'
import './GroupDisplay.css'

GroupDisplayEmpty.propTypes = {
  name: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
}

export default function GroupDisplayEmpty({ name, onGoBack }) {
  return (
    <div className="groupdisplay-wrap">
      <GroupHeader name={name} onClick={onGoBack} />
      <span className="groupdisplay-list groupdisplay-text">No staff members have been added to this group.</span>
      <GroupFooter disabled={true} />
    </div>
  )
}
