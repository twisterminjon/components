import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EnterpriseLogo from '../../Atoms/EnterpriseLogo/EnterpriseLogo'

import './LogoBar.css'

export default class LogoBar extends Component {
  static propTypes = {
    /** Path to image file for the enterprise logo */
    enterpriseLogo: PropTypes.string.isRequired,
  }
  static defaultProps = {
    enterpriseLogo: '',
  }

  render() {
    const { enterpriseLogo } = this.props

    return (
      <div className="logobar-wrap">
        <EnterpriseLogo imgUrl={enterpriseLogo} />
      </div>
    )
  }
}
