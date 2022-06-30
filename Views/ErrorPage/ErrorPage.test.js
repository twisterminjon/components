import React from 'react'
import ErrorPage from './ErrorPage'

describe('ErrorPage', () => {
  const code = 'server_error'
  const message = "TypeError: Cannot read property 'name' of undefined"

  // handle mocks
  const originalError = console.error
  afterEach(() => {
    console.error = originalError
  })

  const graphQlError = {
    graphQLErrors: [
      {
        message: 'good',
        locations: [],
        path: ['protectedAction'],
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      },
      {
        message: 'evil',
        locations: [],
        path: ['protectedAction'],
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      },
    ],
    networkError: null,
    message: 'GraphQL error: You must be logged in',
  }

  const networkError = {
    graphQLErrors: null,
    networkError: {
      result: {
        errors: [
          {
            message: 'evil',
            locations: [],
            path: ['protectedAction'],
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          },
          {
            message: 'good',
            locations: [],
            path: ['protectedAction'],
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          },
        ],
      },
    },
  }

  it('matches the snapshot when shown', () => {
    const wrapper = window.shallow(<ErrorPage code={code} message={message} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with no code', () => {
    const wrapper = window.shallow(<ErrorPage message={message} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with no message', () => {
    // This test will cause the component to write an error message to the console,
    // which will show in the test run. We need to hide that as it is confusing and looks like
    // the test failed.
    console.error = jest.fn()

    const wrapper = window.shallow(<ErrorPage code={code} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with a graphQl error object', () => {
    const wrapper = window.shallow(<ErrorPage error={graphQlError} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches the snapshot with a network error object', () => {
    const wrapper = window.shallow(<ErrorPage error={networkError} />)
    expect(wrapper).toMatchSnapshot()
  })
})
