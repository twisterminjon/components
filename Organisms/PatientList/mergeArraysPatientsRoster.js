import { mergeArrays } from '@shared/helpers'

/**
 * Fixes issue where switching enterprises while loading could show wrong data.
 *
 * If the enterprise of a previous fetch doesn't match with the current
 * enterprise data don't merge the fetched results. This might happen when the
 * pagination was still being fetched when the user requested for another
 * enterprise roster.
 *
 * NOTE (jh): This utility is only used in PatientListContainer, so is not
 * shared code.  I left it as a separate file so it could be easily tested w/
 * Jest.
 *
 * @param {string} path - path to obtain the array to be merged
 * @return {function}
 */
export default function mergeArraysPatientsRoster(path) {
  return (oldData, newData) => {
    const oldEnterpriseId = oldData && oldData.enterprise.id
    const { fetchMoreResult } = newData
    const newEnterpriseId = fetchMoreResult && fetchMoreResult.enterprise.id
    const differentEnterprise = oldEnterpriseId && newEnterpriseId && newEnterpriseId !== oldEnterpriseId

    if (differentEnterprise) {
      return oldData
    } else {
      return mergeArrays(path)(oldData, newData)
    }
  }
}
