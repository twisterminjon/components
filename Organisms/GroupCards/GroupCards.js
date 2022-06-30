import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GroupButton from '../../Atoms/GroupButton/GroupButton'

import './GroupCards.css'

export default class GroupCards extends Component {
  static propTypes = {
    /** Array of groups to show  */
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    /** Function called when a group button is clicked */
    onGroupClick: PropTypes.func.isRequired,
  }

  handleClick(id, name) {
    this.props.onGroupClick(id, name)
  }

  render() {
    const { groups } = this.props

    let GroupCards = null
    if (groups) {
      GroupCards = groups.map(group => (
        <GroupButton
          key={group.id}
          label={group.name}
          name={group.name}
          onClick={() => {
            this.handleClick(group.id, group.name)
          }}
          data-testid={`group-button-${group.name}`}
        />
      ))
    }

    return (
      <div className="groupcards-grid" data-testid="group-cards">
        {GroupCards}
        <div style={{ height: 'var(--bottom-whitespace-v1)' }} />
      </div>
    )
  }
}
