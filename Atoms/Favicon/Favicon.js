import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Favicon extends Component {
  static propTypes = {
    /** Url to an image to display */
    imgUrl: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.setFavicon()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.imgUrl !== prevProps.imgUrl) {
      this.setFavicon()
    }
  }

  setFavicon = () => {
    const favicon = this.props.imgUrl === '' ? 'https://via.placeholder.com/192' : this.props.imgUrl

    let link = null
    const docHead = document.getElementsByTagName('head')[0]

    // ***********
    // apple-touch-icon
    link = getLink('favicon-apple-touch')
    link.rel = 'apple-touch-icon'
    link.href = favicon
    link.sizes = '128x128'
    link.setAttribute('data-testid', 'favicon-apple-touch')
    docHead.appendChild(link)

    // ***********
    // icon
    link = getLink('favicon-icon')
    link.rel = 'icon'
    link.href = favicon
    link.sizes = '192x192'
    link.setAttribute('data-testid', 'favicon-icon')
    docHead.appendChild(link)

    // ***********
    // shortcut icon
    link = getLink('favicon-image')
    link.rel = 'shortcut icon'
    link.href = favicon
    link.type = 'image/x-icon'
    link.setAttribute('data-testid', 'favicon-image')
    docHead.appendChild(link)
  }

  render() {
    // This does not render anything, it just updates the document head
    return null
  }
}

const getLink = dataAttribute => {
  return document.querySelector(`link[data-testid="${dataAttribute}"]`) || document.createElement('link')
}
