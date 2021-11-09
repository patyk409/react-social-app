import React, { useContext } from 'react'
import './DeleteIcon.css'
import { GlobalContext } from '../tools/CreateContext'

const DeleteIcon = (props) => {
  // use context
  const { setConfirmationDisplay, setPostId } = useContext(GlobalContext)

  /*
   * shows confirmation popup and puts post id to variable
   */
  const showConfirmationPopup = (id) => {
    setConfirmationDisplay(true)
    setPostId(id)
  }

  /*
   * jsx
   */
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
