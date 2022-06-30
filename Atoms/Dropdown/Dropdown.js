import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'

import './Dropdown.css'

export default class Dropdown extends Component {
  static propTypes = {
    /* title to show header text */
    title: PropTypes.string,
    /* handle show select pane */
    showSelect: PropTypes.func,
    /* Whether or not the dropdown content is loading */
    loading: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    loading: false,
  }

  render() {
    const { showSelect, title, loading } = this.props

    const showSpinner = loading ? 'button-spinner' : ''

    return (
      <button disabled={loading} type="button" className={`dropdown-button ${showSpinner}`.trim()} onClick={showSelect}>
        <p>
          <Icon name="chevron down" style={{ marginRight: 10 }} />
          {title}
        </p>
      </button>
    )
  }
}
