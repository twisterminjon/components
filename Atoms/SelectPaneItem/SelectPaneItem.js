import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SelectPaneItem.css'

export default class SelectPaneItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    style: PropTypes.object,
    className: PropTypes.string,
    onSelect: PropTypes.func,
  }
  static defaultProps = {
    style: {},
    className: '',
    onSelect: () => {},
  }
  render() {
    const { item, onSelect, className, style } = this.props
    return (
      <div
        className={`selectpane-item ${className}`}
        style={style}
        onClick={() => onSelect(item.id)}
        data-testid={`selectpane-item-${item}`}>
        {item.name}
      </div>
    )
  }
}
