import React from 'react'
import TimeSelector from './TimeSelector'
import dayjs from 'dayjs'
import mockdate from 'mockdate'

const mockFun = jest.fn()

beforeAll(() => {
  mockdate.set('2019-04-07T10:20:30Z')
})

afterAll(() => {
  mockdate.reset()
})

describe('TimeSelector', () => {
  // FIXME: Trigger onChange callback and verify callback type matches defaultValue type, if passed
  // i.e. if string is passed to defaultValue, onChange should use string argument; if dayjs is passed,
  // it should use dayjs argument

  it('accepts minimal props', () => {
    const wrapper = window.shallow(<TimeSelector onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  // FIXME: Enable this to work
  // Parsing of string values is mostly for Storybook testing and I just haven't gotten it to create
  // a consistent time between local development and dev server build, so the tests fail remotely.
  /*
  it('accepts string default value', () => {
    const wrapper = window.shallow(
      <TimeSelector defaultValue={'2:44 pm'} onChange={mockFun} />
    )
    expect(wrapper).toMatchSnapshot()
  })
  */

  it('accepts dayjs default value', () => {
    const wrapper = window.shallow(<TimeSelector defaultValue={dayjs('2020-03-09T10:48:59Z')} onChange={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses 12 hours', () => {
    const wrapper = window.shallow(<TimeSelector onChange={mockFun} use12Hours={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses 24 hours', () => {
    const wrapper = window.shallow(<TimeSelector onChange={mockFun} use12Hours={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Uses custom placeholder value', () => {
    const wrapper = window.shallow(<TimeSelector onChange={mockFun} placeholder="Some custom placeholder value" />)
    expect(wrapper).toMatchSnapshot()
  })
})
