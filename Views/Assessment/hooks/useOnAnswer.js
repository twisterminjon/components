import { useCallback } from 'react'
import { useMutation } from 'react-apollo'

import { AuthUtils } from '@shared/helpers'

import { AssessmentsApi, AssessmentsQl } from '@shared/services'

const useOnAnswer = assessmentSessionId => {
  const [upload] = useMutation(AssessmentsQl.uploadAnswerAttachmentWithNextQuestion())

  const sendAnswer = useCallback(
    (questionId, options) =>
      AssessmentsApi.saveAnswer(AuthUtils.getUserId(), {
        surveySessionId: assessmentSessionId,
        questionId,
        options: { options },
      }),
    [assessmentSessionId]
  )

  const uploadPhoto = useCallback((questionId, image) => upload({ variables: { questionId, image } }), [upload])

  return useCallback(
    ({ id, type, options }) => {
      if (type === 'photo') {
        const { attachment } = options

        // TODO: uncomment on remote monitoring integration
        // const { attachment, reading } = options
        // if (reading) {
        //   return sendAnswer(id, options)
        //     .catch(() =>
        //       Promise.reject(
        //         'Failed to send temperature reading, please try again'
        //       )
        //     )
        // }
        if (attachment) {
          return uploadPhoto(id, attachment)
            .then(({ data }) =>
              Promise.resolve({
                data: data.uploadAnswerAttachmentWithNextQuestion.nextQuestion || {},
              })
            )
            .catch(e => Promise.reject('Sorry, the file could not be uploaded. Please try another file.'))
        }
      }

      return sendAnswer(id, options).catch(() => Promise.reject('Failed to send an answer, please try again'))
    },
    [sendAnswer, uploadPhoto]
  )
}

export default useOnAnswer
