import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconsPatient from '../../Atoms/IconsPatient/IconsPatient'

import './PatientSectionTitle.css'
import Styles from '../../../styles/Style'

export default class PatientSectionTitle extends Component {
  static propTypes = {
    /** Icon to show*/
    icon: PropTypes.string.isRequired,
    /** Text to show */
    text: PropTypes.string.isRequired,
    /** Styles applied to the component wrapper */
    wrapStyle: PropTypes.object,
    /** children that will display next to title */
    children: PropTypes.node,
  }
  static defaultProps = {
    wrapStyle: {},
    onEditClick: () => {},
  }

  render() {
    const { icon, text, wrapStyle, children } = this.props

    return (
      <div className="patientsectiontitle-wrap" style={wrapStyle}>
        <div className="patientsectiontitle-row">
          <div className="patientsectiontitle-title">
            <IconsPatient name={icon} color={Styles.brandColor} className="patientsectiontitle-icon" />
            <span className="patientsectiontitle-text">{text}</span>
          </div>
          {children}
        </div>
        <hr className="patientsectiontitle-rule" />
      </div>
    )
  }
}
