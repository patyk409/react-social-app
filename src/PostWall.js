import React, { useState, useEffect } from 'react'
import './PostWall.css'

import axios from 'axios'
import moment from 'moment'

import PostAuthor from './PostAuthor'
import LikeBox from './LikeBox'
import ConfirmationPopup from './ConfirmationPopup'
import CloserIcon from './CloserIcon'

const Wall = (props) => {
  /*
   * use states
   */
  // const [latestPosts, setLatestPosts] = useState([])
  // const [likeTrigger, setLikeTrigger] = useState(false)
  /*
   * use effects
   */
  // useEffect(() => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/latest',
  //       JSON.stringify(),
  //       props.headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setLatestPosts(res.data)
  //       console.log('get latest posts response:', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [])
  /*
   * jsx
   */
  return (
    <main className="post-wall">
      <ul className="post-wall__post-list">
        {props.latestPosts.map((post) => {
          return (
            <li className="post-list__post-item" key={post.id}>
              <PostAuthor
                userToken={props.userToken}
                post={post}
                unfollowUser={props.unfollowUser}
              />
              <p className="post-item__content">{post.content}</p>
              <div className="post-item__post-info">
                <span className="post-info__post-date">
                  {moment(post.created_at).fromNow()}
                </span>
                <LikeBox
                  userToken={props.userToken}
                  headerConfigAuth={props.headerConfigAuth}
                  post={post}
                  postLike={props.postLike}
                  likeTrigger={props.likeTrigger}
                  setLikeTrigger={props.setLikeTrigger}
                  postDislike={props.postDislike}
                  setMessageTrigger={props.setMessageTrigger}
                  setMessage={props.setMessage}
                />
              </div>
              <CloserIcon
                post={post}
                showConfirmationPopup={props.showConfirmationPopup}
              />
            </li>
          )
        })}
        {props.confirmationPopup ? (
          <aside className="app-popup-bg">
            <ConfirmationPopup
              setConfirmationPopup={props.setConfirmationPopup}
              postId={props.postId}
              deletePost={props.deletePost}
            />
          </aside>
        ) : null}
      </ul>
      <div
        className={
          props.isVisible
            ? 'preloader-container preloader--active'
            : 'preloader-container'
        }
      >
        <div className="preloader-container__preloader"></div>
      </div>
    </main>
  )
}

export default Wall
