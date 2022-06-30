import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'
import Loader from '../../Atoms/Loader/Loader'
import SelectPaneItem from '../../Atoms/SelectPaneItem/SelectPaneItem'

import InfiniteScroll from 'react-infinite-scroll-component'

import './SelectPane.css'

export default class SelectPane extends Component {
  static propTypes = {
    /* array of items to show */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    /* handle select pane close */
    onClose: PropTypes.func,
    /* handle item select */
    onSelect: PropTypes.func,

    /* Whether or not the data is loading*/
    loading: PropTypes.bool,

    /** The current page number, starting from 0, if loading */
    pageNumber: PropTypes.number,

    /** Called, with the current page number, once the page changes */
    onPageNumberChange: PropTypes.func,
  }

  render() {
    const { items, onClose, onSelect, loading = false, pageNumber = 0, onPageNumberChange = () => null } = this.props

    const renderItems = items.map(item => {
      return <SelectPaneItem item={item} key={item.id} onSelect={onSelect} />
    })

    return (
      <div className="selectpane-wrapper" data-testid="selectpane">
        <button onClick={onClose} className="selectpane-close-button">
          <Icon name="close" size="big" style={{ margin: '1rem' }} />
        </button>
        <div id="selectpane-items" className="selectpane-items">
          <InfiniteScroll
            scrollableTarget="selectpane-items"
            dataLength={renderItems.length}
            next={() => onPageNumberChange(pageNumber + 1)}
            hasMore={!loading}
            loading={loading}>
            {renderItems}
          </InfiniteScroll>
        </div>

        <div className="selectpane-loader">
          <Loader show={loading} />
        </div>
      </div>
    )
  }
}
