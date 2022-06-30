import React from 'react'

import ProgramInfoContainer from '../../Organisms/ProgramInfo/ProgramInfoContainer'
import ProgramEventsContainer from '../../Organisms/ProgramEvents/ProgramEventsContainer'
import './ProgramDetails.css'

export default function ProgramDetails({ ...props }) {
  return (
    <div className="programdetails-container">
      <ProgramInfoContainer {...props} />
      <ProgramEventsContainer {...props} />
    </div>
  )
}
