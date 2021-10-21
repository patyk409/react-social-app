import React from 'react'
import './ConfirmationPopup.css'
import axios from 'axios'

const ConfirmationPopup = (props) => {
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
        props.headerConfigAuth,
      )
      .then((res) => {
        // props.setPostTrigger(!props.postTrigger)
        // props.setMessageTrigger(true)
        // props.setMessage('Post has been removed')
        console.log('post delete response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
    props.setConfirmationPopup(false)
  }

  /*
   * jsx
   */
  return (
    <div className='confirmation-popup'>
      <p className='confimation-popup__text'>
        Do you really want to delete this post?
      </p>
      <div className='confirmation-popup__button-box'>
        <button
          className='confirmation-popup__btn yes'
          onClick={() => deletePost(props.postId)}
        >
          <i className='fas fa-check confirmation-popup__btn-yes'></i>
        </button>
        <button
          className='confirmation-popup__btn no'
          onClick={() => props.setConfirmationPopup(false)}
        >
          <i className='fas fa-times confirmation-popup__btn-no'></i>
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
