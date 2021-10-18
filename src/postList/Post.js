import React, { useEffect, useState } from 'react'
import './Post.css'
import axios from 'axios'
import moment from 'moment'

const Post = (props) => {
  const [likeCounter, setLikeCounter] = useState(props.post.likes)

  // useEffect(() => {
  //   setLikeCounter(props.post.likes)

  //   return likeCounter
  // }, [likeCounter, props.likeTrigger])

  console.log(likeCounter)
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
        setLikeCounter(props.post.likes)
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
        setLikeCounter(props.post.likes)
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
    <div className="post">
      <p className="post-item__content">{props.post.content}</p>
      <div className="post-item__post-info">
        <span className="post-info__post-date">
          {moment(props.post.created_at).fromNow()}
        </span>
        <div className="like-box">
          <span className="like-box__counter">{likeCounter.length}</span>
          {props.userToken && (
            <i
              className={
                props.post.likes.filter((like) => {
                  return like.username === localStorage.getItem('name')
                }).length > 0
                  ? 'far fa-heart like-box__icon--active'
                  : 'far fa-heart like-box__icon'
              }
              onClick={(event) => {
                event.target.classList.contains('like-box__icon')
                  ? postLike(props.post.id)
                  : postDislike(props.post.id)
              }}
              tabIndex="0"
            ></i>
          )}
          {!props.userToken && (
            <i className="far fa-heart like-box__icon" tabIndex="0"></i>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
