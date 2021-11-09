import React, { useContext } from 'react'
import './DeleteIcon.css'

import { GlobalContext } from '../tools/CreateContext'

const DeleteIcon = (props) => {
  // GLOBAL CONTEXT
  const { setConfirmationDisplay, setPostId } = useContext(GlobalContext)

  // SHOW CONFIRMATION POPUP - FUNTION
  const showConfirmationPopup = (id) => {
    setConfirmationDisplay(true)
    setPostId(id)
  }

  // JSX
  return (
    <div className="delete-box">
      {props.post.user.username === localStorage.getItem('name') && (
        <div
          className="delete-box__delete-icon"
          onClick={() => {
            showConfirmationPopup(props.post.id)
          }}
          tabIndex="0"
        >
          <i className="fas fa-times delete-box__delete"></i>
        </div>
      )}
    </div>
  )
}

export default DeleteIcon
