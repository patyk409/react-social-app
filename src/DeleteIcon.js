import React from 'react'
import './DeleteIcon.css'

const DeleteIcon = (props) => {
  /*
   * shows confirmation popup and puts post id to variable
   */
  const showConfirmationPopup = (id) => {
    props.setConfirmationPopup(true)
    props.setPostId(id)
  }

  // console.log(props.postId === props.post.id)

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
