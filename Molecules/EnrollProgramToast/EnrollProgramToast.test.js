import React from 'react'
import EnrollProgramToast from './EnrollProgramToast'
import mockdate from 'mockdate'

describe('EnrollProgramToast', () => {
  beforeAll(() => {
    mockdate.set('2021-02-18T13:50:00.000Z')
  })
  afterAll(() => {
    mockdate.reset()
  })
  const mockFun = jest.fn()
  const program = {
    id: '1',
    name: 'New program',
  }

  it('matches the snapshot', () => {
    const wrapper = window.mount(
      <EnrollProgramToast show={true} onEnroll={mockFun} onClose={mockFun} program={program} />
    )

    expect(wrapper.find(EnrollProgramToast)).toMatchSnapshot()
  })
})
