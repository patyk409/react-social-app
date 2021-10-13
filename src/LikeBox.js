import React, { useState } from 'react'
import './LikeBox.css'
import axios from 'axios'

const LikeBox = (props) => {
  /*
   * use states
   */
  const [likeTrigger, setLikeTrigger] = useState(false)
  const [likeCounter, setLikeCounter] = useState(0)
  /*
   * post like
   */
  const postLike = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/like',
        JSON.stringify({
          post_id: id,
        }),
        props.headerConfigAuth,
      )
      .then((res) => {
        props.setLikeTrigger(!props.likeTrigger)
        props.setMessageTrigger(true)
        props.setMessage('Like has been added')
        console.log('like response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  /*
   * post dislike
   */
  const postDislike = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/dislike',
        JSON.stringify({
          post_id: id,
        }),
        props.headerConfigAuth,
      )
      .then((res) => {
        props.setLikeTrigger(!props.likeTrigger)
        props.setMessageTrigger(true)
        props.setMessage('Like has been removed')
        console.log('dislike response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  /*
   * jsx
   */
  return (
    <div className="like-box">
      <span className="like-box__counter">{props.post.likes.length}</span>
      <i
        className={
          props.post.likes.filter((like) => {
            return like.username === localStorage.getItem('name')
          }).length > 0
            ? 'far fa-heart like-box__icon--active'
            : 'far fa-heart like-box__icon'
        }
        onClick={(event) => {
          if (!props.userToken) {
            return null
          } else if (event.target.classList.contains('like-box__icon')) {
            postLike(props.post.id)
            event.target.classList.add('like-box__icon--active')
          } else {
            postDislike(props.post.id)
            event.target.classList.remove('like-box__icon--active')
            event.target.classList.add('like-box__icon')
          }
        }}
        tabIndex="0"
      ></i>
    </div>
  )
}

export default LikeBox
