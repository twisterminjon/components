import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconCloseX from '../../Atoms/Icons/IconCloseX'

import './SearchCloseButton.css'

export default class SearchCloseButton extends Component {
  static propTypes = {
    /** function when button is clicked */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const { onClick, ...rest } = this.props

    return (
      <button className="searchclosebutton" {...rest} onClick={onClick}>
        <IconCloseX />
      </button>
    )
  }
}
