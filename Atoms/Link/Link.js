import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default class Link extends Component {
  render() {
    const { children, ...rest } = this.props

    return <RouterLink {...rest}>{children}</RouterLink>
  }
}
