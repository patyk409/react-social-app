import React, { useContext } from 'react'
import axios from 'axios'
import '../../styles/components/post-list/ConfirmationPopup.scss'

import { GlobalContext } from '../../tools/CreateContext'

const ConfirmationPopup = (props) => {
  // GLOBAL CONTEXT
  const {
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    postToggler,
    setPostToggler,
    postId,
    setConfirmationDisplay,
  } = useContext(GlobalContext)

  // DELETE POST - FUNCTION
  const deletePost = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/delete',
        JSON.stringify({
          post_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setPostToggler(!postToggler)
        setDownbarDisplay(true)
        setDownbarContent('Post has been removed')
      })
      .catch((err) => {
        console.error(err)
      })
    setConfirmationDisplay(false)
  }

  // JSX
  return (
    <div className="confirmation-popup">
      <p className="popup-text">
        Do you really want to delete this post?
      </p>

      <div className="popup-button-container">
        <button
          className="popup-button yes"
          onClick={() => deletePost(postId)}
        >
          <i className="fas fa-check"></i>
        </button>

        <button
          className="popup-button no"
          onClick={() => setConfirmationDisplay(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
