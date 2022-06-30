import React from 'react'
import { Button } from 'semantic-ui-react'

import './AddToCallButton.css'

export default function AddToCallButton(props) {
  const { disabled, ...rest } = props
  return (
    <Button className="addtocall-button" disabled={disabled} {...rest}>
      {props.children}
    </Button>
  )
}
