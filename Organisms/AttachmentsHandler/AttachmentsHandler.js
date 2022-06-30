import React, { useState, useCallback } from 'react'
import { saveAs } from 'file-saver'

import { useEscHandler } from '@shared/hooks'

import MessageAttachmentBanner from '../../Molecules/MessageAttachmentBanner/MessageAttachmentBanner'
import MessageAttachmentView from '../../Atoms/MessageAttachmentView/MessageAttachmentView'

import './AttachmentsHandler.css'

import debug from 'debug'

const d = debug('project:AttachmentsHandler')

const attachmentInitialState = {
  id: null,
  url: null,
  filename: null,
}

export default function AttachmentsHandler({ onDownload, children }) {
  const [show, setShow] = useState(false)
  const [attachment, setAttachment] = useState(attachmentInitialState)

  const openAttachment = useCallback(file => {
    setAttachment(file)
    setShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setShow(false)
    // Remove attachment only after transition ends
    setTimeout(() => setAttachment(attachmentInitialState), 200)
  }, [])

  useEscHandler(handleClose)

  const handleDownload = useCallback(() => {
    const { id, url, filename } = attachment
    d(`downloading attachment ${url}`)

    saveAs(url, filename)
    onDownload(id)
  }, [attachment, onDownload])

  const attachmentClass = show ? 'attachments-handler-visible' : ''

  return (
    <React.Fragment>
      {children({ openAttachment })}
      <div className={`attachments-handler ${attachmentClass}`}>
        <MessageAttachmentBanner onClose={handleClose} onDownload={handleDownload} />
        <MessageAttachmentView>
          <img
            alt="attachment full size"
            src={attachment.url}
            onError={e => {
              e.target.style.height = '68px'
              e.target.style.width = '200px'
            }}
          />
        </MessageAttachmentView>
      </div>
    </React.Fragment>
  )
}
