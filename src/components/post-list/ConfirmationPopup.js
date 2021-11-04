import React, { useContext } from 'react'
import './ConfirmationPopup.css'
import axios from 'axios'
import { GlobalContext } from '../../CreateContext'

const ConfirmationPopup = (props) => {
  // use context
  const {
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    postTrigger,
    setPostTrigger,
    postId,
    setConfirmationPopup,
  } = useContext(GlobalContext)
  /*
   * delete post
   */
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
        setPostTrigger(!postTrigger)
        setDownbarDisplay(true)
        setDownbarContent('Post has been removed')
        console.log('post delete response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
    setConfirmationPopup(false)
  }

  /*
   * jsx
   */
  return (
    <div className="confirmation-popup">
      <p className="confimation-popup__text">
        Do you really want to delete this post?
      </p>
      <div className="confirmation-popup__button-box">
        <button
          className="confirmation-popup__btn yes"
          onClick={() => deletePost(postId)}
        >
          <i className="fas fa-check confirmation-popup__btn-yes"></i>
        </button>
        <button
          className="confirmation-popup__btn no"
          onClick={() => setConfirmationPopup(false)}
        >
          <i className="fas fa-times confirmation-popup__btn-no"></i>
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
