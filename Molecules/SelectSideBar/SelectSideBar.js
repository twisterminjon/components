import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SectionTitle from '../SectionTitle/SectionTitle'
import { Input } from 'semantic-ui-react'
import './SelectSideBar.css'

export default class SelectSideBar extends Component {
  static propTypes = {
    /** If true will display the sidebar */
    show: PropTypes.bool.isRequired,
    /** Text for the title */
    title: PropTypes.string.isRequired,
    /** An arry of items to display in the sidebar list */
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    /** Called when an item in the list is clicked */
    onSelect: PropTypes.func.isRequired,
    /** Called when the Cancel/Close button is clicked */
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    filter: '',
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value })
  }

  render() {
    const { title, onCancel, onSelect, list, show } = this.props
    const { filter } = this.state

    if (!show) return null

    const listItems = list
      .filter(item => {
        if (filter === '') return true

        return item.name.toLowerCase().lastIndexOf(filter.toLowerCase()) !== -1
      })
      .map(item => (
        <li
          key={item.id}
          className="select-side-bar--item"
          onClick={(id, name) => {
            onSelect(item.id, item.name)
          }}
          data-testid={`select-item-${item.name}`}>
          {item.name}
        </li>
      ))

    return (
      <div>
        <div className="selectsidebar-panel" />
        <div className="selectsidebar-wrap">
          <div className="select-side-bar-menu">
            <SectionTitle title={title} label="CLOSE" onButtonClick={onCancel} style={{ marginBottom: 10 }} />
            <Input
              placeholder="Search..."
              fluid
              value={filter}
              data-testid="sidebar-search-input"
              onChange={this.handleFilterChange}
            />
          </div>
          <div className="selectsidebar-list">
            <ul>{listItems}</ul>
          </div>
        </div>
      </div>
    )
  }
}
