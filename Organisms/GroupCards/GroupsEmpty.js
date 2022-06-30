import React from 'react'
import { appTitle } from '../../../config.js'

import './GroupCards.css'

export default function GroupsEmpty() {
  return (
    <div className="groupcards-empty" data-testid="group-cards-empty">
      Welcome to <span>{appTitle}</span>
    </div>
  )
}
