import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserCardFavorite from '../../Molecules/UserCardFavorite/UserCardFavorite'
import UserCardPlaceholder from '../../Molecules/UserCardFavorite/UserCardFavoritePlaceholder'
import FavBarLoader from './FavBarLoader'
import ScrollArrow from '../../Atoms/ScrollArrow/ScrollArrow'

import './FavBar.css'

export default class FavBar extends Component {
  static propTypes = {
    /** This if for showing/hiding message button in favorite */
    messagesEnabled: PropTypes.bool.isRequired,
    /** This if for showing/hiding message button in favorite */
    virtualCallsEnabled: PropTypes.bool,
    /** Array of users to show as favorites */
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        overallStatus: PropTypes.string.isRequired,
      })
    ),
    /** If true, will show the loading placeholder */
    loading: PropTypes.bool.isRequired,
    /** Start a call with the user */
    onCall: PropTypes.func.isRequired,
    /** Start a message with the user */
    onMessage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      favsToShow: [],
      favIndex: 0,
      showScrollLeft: false,
      showScrollRight: false,
    }

    this.handleStartCall = this.handleStartCall.bind(this)
    this.handleStartMessage = this.handleStartMessage.bind(this)
    this.updateFavsToShow = this.updateFavsToShow.bind(this)
    this.getMaxNumberOfFavsThatCanBeShown = this.getMaxNumberOfFavsThatCanBeShown.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleScrollLeft = this.handleScrollLeft.bind(this)
    this.handleScrollRight = this.handleScrollRight.bind(this)
  }

  componentDidMount() {
    if (this.getMaxNumberOfFavsThatCanBeShown() < this.props.users.length) {
      this.setState({ showScrollRight: true })
    }

    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps, prevState) {
    // We may be coming back here from another route
    // when that happens we don't have any state
    // and the props have NOT changed.
    // We need to force this to update state.
    const update = this.state.favsToShow.length === 0 && this.props.users.length > 0

    if (prevProps.users !== this.props.users || update) {
      this.updateFavsToShow(this.state.favIndex)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.updateFavsToShow(this.state.favIndex)
  }

  handleStartCall(user) {
    this.props.onCall(user)
  }

  handleStartMessage(user) {
    this.props.onMessage(user)
  }

  updateFavsToShow(index) {
    const favCount = this.getMaxNumberOfFavsThatCanBeShown()
    const remaining = this.props.users.length - index

    this.setState({
      favsToShow: this.props.users.slice(index, favCount + index),
      showScrollLeft: index > 0,
      showScrollRight: remaining > favCount,
    })
  }

  getMaxNumberOfFavsThatCanBeShown() {
    const favWidth = 116
    const arrowWidth = 40

    const innerWidth = window.innerWidth - arrowWidth * 2
    let favCount = innerWidth / favWidth

    favCount = favCount > 0 ? Math.floor(favCount) : 0

    return favCount
  }

  handleScrollLeft() {
    if (this.state.favIndex > 0) {
      const newIndex = this.state.favIndex - this.getMaxNumberOfFavsThatCanBeShown()
      this.setState({ favIndex: newIndex })
      this.updateFavsToShow(newIndex)
    }
  }

  handleScrollRight() {
    if (this.state.favIndex < this.props.users.length - 1) {
      const newIndex = this.state.favIndex + this.getMaxNumberOfFavsThatCanBeShown()
      this.setState({ favIndex: newIndex })
      this.updateFavsToShow(newIndex)
    }
  }

  render() {
    const { users, loading, messagesEnabled, virtualCallsEnabled } = this.props
    const { favsToShow, showScrollLeft, showScrollRight } = this.state

    if (loading) {
      return (
        <div className="favbar-wrap favbar--row favbar--arrow-padding">
          <FavBarLoader />
        </div>
      )
    }

    if (!users || users.length <= 0) {
      return (
        <div className="favbar-wrap favbar--row">
          <UserCardPlaceholder />
          <span className="favbar-placeholder">
            Start adding favorites by selecting users in the search or group lists.
          </span>
        </div>
      )
    }

    const cardRender = favsToShow.map(user => (
      <UserCardFavorite
        key={user.id}
        userName={user.displayName}
        profileImage={user.profileImage}
        status={user.overallStatus}
        useMenu={messagesEnabled || virtualCallsEnabled}
        virtualCallsEnabled={virtualCallsEnabled}
        messagesEnabled={messagesEnabled}
        style={{ flexShrink: 0 }}
        onCall={() => {
          this.handleStartCall(user)
        }}
        onMessage={() => {
          this.handleStartMessage(user)
        }}
      />
    ))

    return (
      <div className="favbar-wrap" data-testid="favbar">
        {showScrollLeft && (
          <div className="favbar-arrow-container favbar-arrow-left-container">
            <ScrollArrow direction="left" onClick={this.handleScrollLeft} data-testid="favbar-scroll-left" />
          </div>
        )}

        <div className="favbar-favs">{cardRender}</div>

        {showScrollRight && (
          <div className="favbar-arrow-container favbar-arrow-right-container">
            <ScrollArrow direction="right" onClick={this.handleScrollRight} data-testid="favbar-scroll-right" />
          </div>
        )}
      </div>
    )
  }
}
