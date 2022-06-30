import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Image } from 'semantic-ui-react'

import logoPlaceholder from '../../../Images/logo_placeholder.png'

import './EnterpriseLogo.css'

export default class EnterpriseLogo extends Component {
  static propTypes = {
    /** Path to an image to display */
    imgUrl: PropTypes.string,
  }
  static defaultProps = {
    imgUrl: '',
  }

  render() {
    const { imgUrl } = this.props

    return (
      <div className="enterpriselogo">
        <Image src={imgUrl === '' ? logoPlaceholder : imgUrl} className="enterpriselogo-image" />
      </div>
    )
  }
}
