import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Dimmer.css'

export default class Dimmer extends Component {
  static propTypes = {
    /** If true, the dimmer will be shown */
    show: PropTypes.bool.isRequired,
    /** A dimmer can use a different color for the background */
    backgroundColor: PropTypes.oneOf(['positive', 'negative', 'black']),
    /** ClassName for the wrapper */
    className: PropTypes.string,
    /** Style for the wrapper */
    style: PropTypes.object,
  }
  static defaultProps = {
    show: true,
    backgroundColor: 'positive',
    className: '',
    style: {},
  }
  render() {
    const { show, backgroundColor, className, style } = this.props

    const visibility = show ? 'dimmer--show' : 'dimmer--hide'

    const backgroundColors = {
      black: 'dimmer--black',
      positive: 'dimmer--positive',
      negative: 'dimmer--negative',
    }

    const colorClass = backgroundColors[backgroundColor]

    return <div style={style} className={`dimmer ${colorClass} ${visibility} ${className}`.trim()} />
  }
}
