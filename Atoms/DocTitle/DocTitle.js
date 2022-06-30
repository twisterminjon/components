import { Component } from 'react'
import PropTypes from 'prop-types'

export default class DocTitle extends Component {
  static propTypes = {
    /** Title to display in tab */
    title: PropTypes.string,
  }
  static defaultProps = {
    title: '',
  }

  componentDidMount() {
    document.title = this.props.title ? `Provider Portal - ${this.props.title}` : 'Provider Portal'
  }

  render() {
    return null
  }
}
