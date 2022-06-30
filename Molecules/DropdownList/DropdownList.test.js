import React from 'react'
import DropdownList from './DropdownList'

describe('DropdownList', () => {
  const name = 'dropdown'
  const label = 'Klingon'
  const value = 'Worf'
  const fluid = true
  const list = 'list detail'
  const listData = ['Worf', 'Picard', 'Data']
  const placeholder = 'Star Trek'
  const error = 'It is busted'

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <DropdownList
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        list={list}
        listData={listData}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('passes the label prop down', () => {
    const wrapper = window.shallow(
      <DropdownList
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        list={list}
        listData={listData}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper.find('InputLabel').prop('label')).toEqual(label)
  })

  it('passes the placeholder prop down', () => {
    const wrapper = window.shallow(
      <DropdownList
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        list={list}
        listData={listData}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper.find('Dropdown').prop('placeholder')).toEqual(placeholder)
  })

  it('passes the hasError prop down', () => {
    const wrapper = window.shallow(
      <DropdownList
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        list={list}
        listData={listData}
        placeholder={placeholder}
        errorMessage={error}
        hasError={true}
      />
    )
    expect(wrapper.find('Dropdown').prop('error')).toBeTruthy()
    expect(wrapper.find('InputMessage').prop('show')).toBeTruthy()
  })

  it('passes the error prop down', () => {
    const wrapper = window.shallow(
      <DropdownList
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        list={list}
        listData={listData}
        placeholder={placeholder}
        errorMessage={error}
        hasError={false}
      />
    )
    expect(wrapper.find('InputMessage').prop('message')).toEqual(error)
  })
})
