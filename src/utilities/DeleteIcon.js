import React, { useContext } from 'react'
import '../styles/utilities/DeleteIcon.scss'

import { GlobalContext } from '../context/CreateContext'

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
    <>
      {props.post.user.username === localStorage.getItem('name') && (
        <div
          className="delete-icon"
          onClick={() => {
            showConfirmationPopup(props.post.id)
          }}
          tabIndex="0"
        >
          <i className="fas fa-times"></i>
        </div>
      )}
    </>
  )
}

export default DeleteIcon
