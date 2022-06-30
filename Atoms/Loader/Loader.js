import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loader as NewLoader, Dimmer, Segment } from 'semantic-ui-react'

export default class Loader extends Component {
  static propTypes = {
    show: PropTypes.bool,
    label: PropTypes.string,
  }
  static defaultProps = {
    show: false,
    label: 'Loading',
  }

  render() {
    const { label, show } = this.props

    return (
      <Segment basic style={{}}>
        <Dimmer active={show} inverted>
          <NewLoader indeterminate content={label} inverted />
        </Dimmer>
      </Segment>
    )
  }
}
