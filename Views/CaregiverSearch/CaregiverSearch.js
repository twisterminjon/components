import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SectionTitle from '../../Molecules/SectionTitle/SectionTitle'
import AddButton from '../../Atoms/AddButton/AddButton'
import PhoneInput from '../../Molecules/PhoneInput/PhoneInput'
import DocTitle from '../../Atoms/DocTitle/DocTitle'

import './CaregiverSearch.css'

export default class CaregiverSearch extends Component {
  static propTypes = {
    /** Called after the user presses enter in search field */
    onSearch: PropTypes.func.isRequired,
    /** Called when the Cancel/Close button is clicked */
    onCancel: PropTypes.func.isRequired,
    /** Called after the add button is clicked */
    onAdd: PropTypes.func.isRequired,
  }

  state = { searchVal: '' }

  handleSearchChange = e => {
    this.setState({ searchVal: e })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchCriteria = this.state.searchVal
      this.props.onSearch(searchCriteria)
    }
  }

  render() {
    const { onCancel, onAdd } = this.props
    const { searchVal } = this.state

    return (
      <div>
        <DocTitle title="Caregiver Search" />

        <div className="caregiversearch">
          <SectionTitle title="Find a Caregiver" label="CLOSE" onButtonClick={onCancel} />
          <div style={{ height: 10 }} />
          <AddButton
            onClick={onAdd}
            style={{
              position: 'absolute',
              top: 64,
              right: 20,
              zIndex: 1,
            }}
            data-testid="add-caregiver"
          />
          <PhoneInput
            style={{ marginTop: -12 }}
            placeholder="Enter phone number..."
            name="phone"
            value={searchVal}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleKeyPress}
            data-testid="caregiver-search"
          />
          <div style={{ height: 10 }} />
        </div>
      </div>
    )
  }
}
