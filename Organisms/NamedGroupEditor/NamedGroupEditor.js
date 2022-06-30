import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { debounce, differenceBy, orderBy, uniqBy } from 'lodash-es'

import UserCardSimple from '../../Molecules/UserCardSimple/UserCardSimple'
import TextInput from '../../Molecules/TextInput/TextInput'
import Button from '../../Atoms/Button/Button'
import TagUserInput from '../../Molecules/TagUserInput/TagUserInput'
import SpinnerDots from '../../Atoms/SpinnerDots/SpinnerDots'
import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'
import IconTimes from '../../Atoms/Icons/IconTimes'

import './NamedGroupEditor.css'
import InfiniteScroll from 'react-infinite-scroll-component'

NamedGroupEditor.propTypes = {
  /** Can show a loader on the save/update button */
  loading: PropTypes.bool,

  /** Can show a loader indicator for the users */
  usersLoading: PropTypes.bool,

  /** User lookup  */
  userLookup: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    })
  ),
  /** The current members of the group */
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    })
  ),

  /** Can display in edit mode */
  editing: PropTypes.bool,

  /** Can include a group name when editing is true */
  groupName: PropTypes.string,

  /** called after the save/rename action */
  onSave: PropTypes.func.isRequired,

  /** Called after the close action */
  onClose: PropTypes.func.isRequired,

  /** The current page number, starting from 0, of results */
  pageNumber: PropTypes.number,

  /** Called with the page number, after the page number has changed */
  onPageNumberChange: PropTypes.func,

  /** Called, with the search value, after the search value has changed */
  onSearchChange: PropTypes.func.isRequired,
}

NamedGroupEditor.defaultProps = {
  loading: false,
  usersLoading: false,
  editing: false,
  groupName: '',
  members: [],
  onRemove: () => {},
}

export default function NamedGroupEditor({
  loading,
  usersLoading,
  userLookup,
  members,
  editing,
  groupName,
  onSave,
  onClose,
  pageNumber,
  onPageNumberChange,
  onSearchChange,
}) {
  const [name, setName] = useState(groupName)
  const [memberList, setMemberList] = useState(members)
  const [searchValue, setSearchValue] = useState('')
  const [errors, setErrors] = useState({ name: '', members: '' })
  const [removedUsers, setRemovedUsers] = useState([])

  // Remove any current members from the lookup
  const lookupList = useMemo(() => {
    let lookupAndRemoved = []
    if (removedUsers && removedUsers.length > 0) {
      let filteredRemovedUsers = removedUsers.filter(u =>
        u.displayName.toLowerCase().includes(searchValue.toLowerCase())
      )
      lookupAndRemoved = orderBy(
        uniqBy([...userLookup, ...filteredRemovedUsers], 'id'),
        [user => user.displayName.toLowerCase()],
        ['asc']
      )
    } else {
      lookupAndRemoved = userLookup
    }

    return differenceBy(lookupAndRemoved, memberList, 'id')
  }, [memberList, removedUsers, searchValue, userLookup])

  // Render count... see the following useEffect for why
  const refRenderCount = useRef(-1)
  ++refRenderCount.current
  useEffect(() => {
    // Skip the first render
    if (refRenderCount.current >= 1) {
      // Increment the page number after each member modification so that we
      // don't prematurely run out of members
      const debounced = debounce(() => onPageNumberChange(pageNumber => pageNumber + 1), 500)

      // Debounce to ease the load on the server (otherwise this can get really
      // slow if rapidly editing member list)
      debounced()

      return function unmount() {
        // Don't run the debounce this render cycle
        debounced.cancel()
      }
    }
  }, [memberList, onPageNumberChange])

  // render the list to display
  const renderLookup = lookupList.map(user => {
    return (
      <UserCardSimple
        key={user.id}
        userName={user.displayName}
        profileImage={user.profileImage}
        hideStatus
        onClick={() => {
          handleAddMember(user.id)
        }}
      />
    )
  })

  const handleAddMember = useCallback(
    userId => {
      const user = lookupList.filter(u => u.id === userId)[0]
      setRemovedUsers(removedUsers.filter(u => u.id !== user.id))
      setMemberList(currentSelectedUsers => [...currentSelectedUsers, user])
      setErrors({ ...errors, members: '' })
      setSearchValue('')
    },
    [errors, lookupList, removedUsers]
  )

  const handleRemoveMember = useCallback(
    userId => {
      const removeUser = memberList.filter(u => u.id === userId)[0]
      setMemberList(currentSelectedUsers => currentSelectedUsers.filter(u => u.id !== removeUser.id))
      setRemovedUsers([...removedUsers, removeUser])
    },
    [memberList, removedUsers]
  )

  const handleNameChange = e => {
    setName(e.target.value)
    if (e.target.value !== '') {
      setErrors({ ...errors, name: '' })
    }
  }

  /**
   * @param {DOMEvent} evt
   */
  const handleSearchChange = evt => {
    const searchValue = evt.target.value
    setSearchValue(searchValue)
  }

  useEffect(() => {
    onSearchChange(searchValue)
  }, [searchValue, onSearchChange])

  const handleSave = () => {
    if (!validate(name, memberList)) return

    // convert member list into list of ids
    const memberIds = memberList.map(m => m.id)

    onSave(name, memberIds)
  }

  const validate = () => {
    let validation = true
    let validationErrors = { name: '', members: '' }

    if (name === '') {
      validationErrors.name = 'You must provide a group name'
      validation = false
    }

    if (memberList.length === 0) {
      validationErrors.members = 'You must add at least 1 member to the group'
      validation = false
    }

    setErrors(validationErrors)

    return validation
  }

  return (
    <div className="namedgroupeditor">
      <div className="namedgroupeditor-window">
        <div className="namedgroupeditor-header">
          <div className="namedgroupeditor--row namedgroupeditor--align-center">
            <h3>{editing ? 'Edit message group' : 'Create a new message group'}</h3>
            <ButtonIcon onClick={onClose}>
              <IconTimes color="var(--white)" />
            </ButtonIcon>
          </div>
          <div className="namedgroupeditor--row namedgroupeditor--align-top">
            <TextInput
              label="Group Name"
              style={{ marginRight: 16 }}
              value={name}
              onChange={handleNameChange}
              placeholder="Enter a name for the group..."
              errorMessage={errors.name}
              hasError={!!errors.name}
              maxLength="30"
              autoFocus={true}
              data-testid="named-group-name-input"
            />
            <div className="namedgroupeditor-button">
              <Button
                style={{ height: 34 }}
                onClick={handleSave}
                data-testid="named-group-button-save"
                loading={loading}
                disabled={loading}>
                {editing ? 'Update' : 'Save'}
              </Button>
            </div>
          </div>
          <TagUserInput
            style={{ marginTop: 16 }}
            value={searchValue}
            users={memberList}
            onSearch={handleSearchChange}
            onRemove={handleRemoveMember}
            errorMessage={errors.members}
            hasError={!!errors.members}
          />
        </div>
        {usersLoading && (
          <div className="namedgroupeditor-spinner-container">
            <SpinnerDots className="namedgroupeditor-spinner" />
          </div>
        )}

        <div id="namedgroupeditor-list" className="namedgroupeditor-list">
          <InfiniteScroll
            scrollableTarget="namedgroupeditor-list"
            dataLength={renderLookup.length}
            next={() => onPageNumberChange(pageNumber + 1)}
            hasMore={!loading}
            loading={loading}>
            {renderLookup}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}
