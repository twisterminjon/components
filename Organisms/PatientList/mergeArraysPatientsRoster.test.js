import mergeArraysPatientsRoster from './mergeArraysPatientsRoster'

describe('mergeArraysPatientsRoster', () => {
  const oldData = {
    enterprise: {
      id: 1,
      test: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
  }
  const newData = {
    fetchMoreResult: {
      enterprise: {
        id: 2,
        test: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  }
  it('does not merge new data as enterprises differ', () => {
    const result = mergeArraysPatientsRoster('enterprise.test')(oldData, newData)

    expect(result).toEqual(oldData)
  })

  const newDataSameEnterprise = {
    fetchMoreResult: {
      enterprise: {
        id: 1,
        test: [{ id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  }
  const expected = {
    enterprise: {
      id: 1,
      test: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    },
  }
  it('merges path arrays for patient roster as new data is from same enterprise', () => {
    const result = mergeArraysPatientsRoster('enterprise.test')(oldData, newDataSameEnterprise)
    expect(result).toEqual(expected)
  })
})
