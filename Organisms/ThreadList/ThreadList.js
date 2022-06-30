import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ThreadStatus } from '@shared/helpers'

import ThreadListCard from './ThreadListCard'
import SearchBar from '../../Molecules/SearchBar/SearchBar'
import IconPlus from '../../Atoms/Icons/IconPlus'
import ThreadListAccordion from './ThreadListAccordion'
import Loader from '../../Atoms/Loader/Loader'

import './ThreadList.css'

export default class ThreadList extends Component {
  static propTypes = {
    /** Array of data to display */
    threads: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        unreadMessagesCount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isGroup: PropTypes.bool.isRequired,
        isNamedGroup: PropTypes.bool.isRequired,
        groupName: PropTypes.string,
        profileImage: PropTypes.string.isRequired,
        isOwn: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        unread: PropTypes.bool.isRequired,
        membersCount: PropTypes.number,
        status: PropTypes.oneOf(Object.values(ThreadStatus)).isRequired,
        showDraftPreview: PropTypes.bool.isRequired,
        showDraftNotification: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,

    /** The currently selected item in the list */
    selectedId: PropTypes.string,

    /** Called after the add group action */
    onShowGroupEditor: PropTypes.func.isRequired,

    /** Function use to filter the threads */
    onSearch: PropTypes.func.isRequired,

    /** Called after thread from the list pressed */
    onThreadClick: PropTypes.func.isRequired,

    /** Indicates if there are more threads to load */
    hasMoreThreads: PropTypes.bool.isRequired,

    /** Indicates if the query is loading */
    loading: PropTypes.bool.isRequired,

    /** Called after a scroll has reached the bottom of the displayed list */
    onReachBottom: PropTypes.func.isRequired,
  }
  static defaultProps = {
    selectedId: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(searchTerm) {
    this.setState({ searchTerm })
    this.props.onSearch(searchTerm)
  }

  render() {
    const { selectedId, onShowGroupEditor, threads, hasMoreThreads, loading, onThreadClick } = this.props

    const { searchTerm } = this.state

    const handleScroll = (entries, observer) => {
      if (entries[0].isIntersecting && hasMoreThreads) {
        this.props.onReachBottom()
      }
    }

    const startObserving = observer => {
      let scrollTarget = document.querySelector('[data-testid="message-list-messages-content"]')
      if (scrollTarget && scrollTarget.lastChild) {
        observer.observe(scrollTarget.lastChild)
      }
    }
    let observer = new IntersectionObserver(handleScroll)
    // If there are more threads start the observer for the last message on the list
    // if not, disconnect the observer and stop fetching more data
    if (hasMoreThreads) startObserving(observer)
    else observer.disconnect()

    const renderThreads = threads.map(thread => {
      return (
        <ThreadListCard
          thread={thread}
          key={thread.id}
          selected={thread.id === selectedId}
          onClick={() => onThreadClick(thread.id)}
        />
      )
    })

    return (
      <div>
        <SearchBar onChange={this.handleSearchChange} value={searchTerm} focusOnMount={false} />

        <div className="messagelist-list" data-testid="message-list">
          <ThreadListAccordion startOpen onClickGroup={onShowGroupEditor} name="messages" label="Messages">
            {renderThreads}
          </ThreadListAccordion>
          <div className="messagelist-loader">
            <Loader show={loading} />
          </div>
        </div>
      </div>
    )
  }
}

export const AddButton = ({ onClick }) => {
  return (
    <button className="messagelist-add-button button-reset" onClick={onClick}>
      <div className="messagelist-add-button-background">
        <IconPlus size={9} color="var(--messagepage_bg)" />
      </div>
    </button>
  )
}
