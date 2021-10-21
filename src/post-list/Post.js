import React, { useState, useEffect } from 'react'
import './Post.css'
import axios from 'axios'
import moment from 'moment'
import DownbarInfo from '../DownbarInfo'

const Post = (props) => {
  // an array of post likes
  const [likeCounter, setLikeCounter] = useState(props.post.likes)
  // modal info content
  const [messageContent, setMessageContent] = useState('')
  // modal display toggler
  const [messageDisplay, setMessageDisplay] = useState(false)

  /*
   * closes modal with action info
   */
  useEffect(() => {
    const messageCloser = setTimeout(() => {
      if (messageDisplay) {
        setMessageDisplay(false)
      }
    }, 1500)
    return () => clearTimeout(messageCloser)
  }, [messageDisplay])

  /*
   * adds user data to likes array so post is liked
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
        setLikeCounter(
          likeCounter.concat({ username: localStorage.getItem('name') }),
        )
        setMessageContent('Like has been added')
        setMessageDisplay(true)
        console.log('like response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /*
   * removes user data from likes array so post is not liked any more
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
        setLikeCounter(
          likeCounter.filter((user) => {
            return user.username !== localStorage.getItem('name')
          }),
        )
        setMessageContent('Like has been removed')
        setMessageDisplay(true)
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
                likeCounter.filter((like) => {
                  return like.username === localStorage.getItem('name')
                }).length > 0
                  ? 'far fa-heart like-box__icon--active'
                  : 'far fa-heart like-box__icon'
              }
              onClick={() => {
                likeCounter.filter((like) => {
                  return like.username === localStorage.getItem('name')
                }).length > 0
                  ? postDislike(props.post.id)
                  : postLike(props.post.id)
              }}
              tabIndex="0"
            ></i>
          )}
          {!props.userToken && (
            <i className="far fa-heart like-box__icon" tabIndex="0"></i>
          )}
        </div>
      </div>
      {messageDisplay && <DownbarInfo messageContent={messageContent} />}
    </div>
  )
}

export default Post
