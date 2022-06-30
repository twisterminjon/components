import React from 'react'
import Messages from './Messages'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

const mockFun = jest.fn()

describe('Messages', () => {
  // Enzyme and Memory router don't play nice with each other. The router uses a random key and changes enzymes wrapper contents.
  // I've switched to the base react-test-renderer
  it('matches the snapshot', () => {
    const comp = renderer.create(
      <MemoryRouter initialEntries={['/app/patients']}>
        <Messages onSend={mockFun} searchTerm="s" onStartCall={mockFun} />
      </MemoryRouter>
    )
    const tree = comp.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
