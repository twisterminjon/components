import React from 'react'
import Interpreters from './Interpreters'

describe('Interpreters', () => {
  const mockFun = jest.fn()

  const languages = [
    {
      id: 'spanish',
      name: 'Spanish',
    },
    {
      id: 'arabic',
      name: 'Arabic',
    },
  ]

  it('matches the snapshot', () => {
    const wrapper = window.shallow(<Interpreters languages={languages} onStartCall={mockFun} />)

    expect(wrapper).toMatchSnapshot()
  })

  it("doesn't render empty block if interpreters were provided", () => {
    const wrapper = window.shallow(<Interpreters languages={languages} onStartCall={mockFun} />)
    const emptyBlock = wrapper.find('[data-testid="interpreters-empty"]').exists()
    expect(emptyBlock).toBeFalsy()
  })

  it("renders empty block if interpreters weren't provided", () => {
    const wrapper = window.shallow(<Interpreters onStartCall={mockFun} />)
    const emptyBlock = wrapper.find('[data-testid="interpreters-empty"]').exists()
    expect(emptyBlock).toBeTruthy()
  })
})
