import React from 'react'
import DateSelector from './DateSelector'
import dayjs from 'dayjs'
import mockdate from 'mockdate'

const mockFun = jest.fn()

const RealMathRandom = Math.random

beforeAll(() => {
  mockdate.set('2019-04-07T10:20:30Z')
  global.Math.random = jest.fn(() => 0.14)
})

afterAll(() => {
  mockdate.reset()
  global.Math.random = RealMathRandom
})

describe('DateSelector', () => {
  // FIXME: Trigger onChange callback and verify callback type matches defaultValue type, if passed
  // i.e. if string is passed to defaultValue, onChange should use string argument; if dayjs is passed,
  // it should use dayjs argument

  // Note: id has to be passed to each instance here, or Jest will fail on subsequent test runs due to the auto-generation of ids in the component

  // FIXME: Test for string-based defaultValues
  // Parsing of string values is mostly for Storybook testing and I just haven't gotten it to create
  // a consistent time between local development and dev server build, so the tests fail remotely.

  it('accepts minimal props', () => {
    const wrapper = window.shallow(<DateSelector onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts string default value', () => {
    const wrapper = window.shallow(<DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts dayjs default value', () => {
    const wrapper = window.shallow(<DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('appends to body', () => {
    const wrapper = window.shallow(
      <DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} appendToBody={true} onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('appends to parent component', () => {
    const wrapper = window.shallow(
      <DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} appendToBody={false} onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts date format', () => {
    const wrapper = window.shallow(
      <DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} format="MM/DD/YYYY" onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts alternative date format', () => {
    const wrapper = window.shallow(
      <DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} format="YYYY/MM/DD" onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts arbitrary number of months', () => {
    const wrapper = window.shallow(
      <DateSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} numberOfMonths={4} onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
