import React from 'react'

import ThreadListAccordion from './ThreadListAccordion'

describe('ThreadListAccordion', () => {
  const mockFun = jest.fn()

  it('matches the snapshot', () => {
    const wrapper = window.shallow(
      <ThreadListAccordion label="polka" name="polka" onClickGroup={mockFun}>
        <p>test</p>
      </ThreadListAccordion>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
