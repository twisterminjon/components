import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dropdown from '../../Atoms/Dropdown/Dropdown'

import './PatientListHeader.css'

export default class PatientListHeader extends Component {
  static propTypes = {
    /* header title text */
    title: PropTypes.string,
    /* handle show selep pane */
    showSelect: PropTypes.func,
    /* Whether or not the content is loading */
    loading: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    loading: false,
  }

  render() {
    const { showSelect, title, loading } = this.props
    return (
      <div className="patientlistheader">
        <Dropdown loading={loading} title={title} showSelect={showSelect} />
      </div>
    )
  }
}
