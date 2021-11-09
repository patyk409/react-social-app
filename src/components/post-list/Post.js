import React, { useState, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import './Post.css'

import { GlobalContext } from '../../tools/CreateContext'

const Post = (props) => {
  // LOCAL STATE
  const [likeCounter, setLikeCounter] = useState(props.post.likes)

  // GLOBAL CONTEXT
  const {
    isLogged,
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
  } = useContext(GlobalContext)

  // POST LIKE - FUNCTION
  const postLike = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/like',
        JSON.stringify({
          post_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setLikeCounter(
          likeCounter.concat({ username: localStorage.getItem('name') }),
        )
        setDownbarContent('Like has been added')
        setDownbarDisplay(true)
        console.log('like response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // POST DISLIKE - FUNCTION
  const postDislike = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/dislike',
        JSON.stringify({
          post_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setLikeCounter(
          likeCounter.filter((user) => {
            return user.username !== localStorage.getItem('name')
          }),
        )
        setDownbarContent('Like has been removed')
        setDownbarDisplay(true)
        console.log('dislike response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // JSX
  return (
    <div className="post">
      <div className="post-item__post-info">
        <span className="post-info__post-date">
          {moment(props.post.created_at).fromNow()}
        </span>

        <div className="like-box">
          <span className="like-box__counter">{likeCounter.length}</span>

          {isLogged && (
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

          {!isLogged && (
            <i
              className="far fa-heart like-box__icon--disabled"
              tabIndex="0"
            ></i>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post
