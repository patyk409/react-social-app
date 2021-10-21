import React, { useState, useEffect } from 'react'
import './PostList.css'
import axios from 'axios'

import Post from './Post'
import ConfirmationPopup from './ConfirmationPopup'
import Preloader from '../Preloader'
import DeleteIcon from '../DeleteIcon'

const PostList = (props) => {
  // an array of latest posts handler
  const [latestPosts, setLatestPosts] = useState([])
  // id of post to delete
  const [postId, setPostId] = useState(null)
  // confirmation popup handler
  const [confirmationPopup, setConfirmationPopup] = useState(false)

  /*
   * gets latest posts data from api and maintains latest posts in the state of array
   */
  useEffect(() => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/latest',
        JSON.stringify(),
        props.headerConfigAuth,
      )
      .then((res) => {
        setLatestPosts(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [props.postTrigger, props.userToken])

  /*
   * gets posts older than latest posts and adds it to the state of posts array
   */
  const getMorePosts = (date) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/older-then',
        JSON.stringify({
          date: date,
        }),
        props.headerConfigAuth,
      )
      .then((res) => {
        setLatestPosts(latestPosts.concat(res.data))
        console.log('get more posts response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /*
   * checks if element with reference is in the viewport and calls function to load more posts
   */
  useEffect(() => {
    if (props.isVisible && latestPosts.length > 0) {
      getMorePosts(latestPosts[latestPosts.length - 1].created_at)
    }
  }, [props.isVisible])

  /*
   * removes user from the array of followed users and puts it back into recommendation list
   */
  const unfollowUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/disfollow',
        JSON.stringify({
          leader_id: id,
        }),
        props.headerConfigAuth,
      )
      .then((res) => {
        props.setFollowToggler(!props.followToggler)
        props.setMessageTrigger(true)
        props.setMessage('Follow has been removed')
        console.log('unfollow response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /*
   * jsx
   */
  return (
    <main className="post-box">
      <ul className="post-box__post-list">
        {latestPosts.map((post) => {
          return (
            <li className="post-list__post-item" key={post.id}>
              <div className="post-author">
                <img
                  src={post.user.avatar_url}
                  alt="user_avatar"
                  className="post-author__img"
                />
                <div>
                  <p className="post-author__name">{post.user.username}</p>
                  <span className="post-author__email">{post.user.email}</span>
                </div>
                {props.userToken &&
                post.user.username !== localStorage.getItem('name') ? (
                  <div
                    className="unfollow-icon"
                    onClick={() => {
                      unfollowUser(post.user.id)
                    }}
                    tabIndex="0"
                  >
                    <i className="fas fa-minus post-author__unfollow-icon"></i>
                  </div>
                ) : null}
              </div>
              <Post
                userToken={props.userToken}
                post={post}
                headerConfigAuth={props.headerConfigAuth}
                postId={postId}
              />
              <DeleteIcon
                post={post}
                showConfirmationPopup={props.showConfirmationPopup}
                setConfirmationPopup={setConfirmationPopup}
                setPostId={setPostId}
                postId={postId}
              />
            </li>
          )
        })}
        {confirmationPopup ? (
          <aside className="app-popup-bg">
            <ConfirmationPopup
              setConfirmationPopup={setConfirmationPopup}
              postId={postId}
              deletePost={props.deletePost}
              setMessageTrigger={props.setMessageTrigger}
              setMessage={props.setMessage}
              headerConfigAuth={props.headerConfigAuth}
              postTrigger={props.postTrigger}
              setPostTrigger={props.setPostTrigger}
            />
          </aside>
        ) : null}
      </ul>
      <Preloader isVisible={props.isVisible} />
    </main>
  )
}

export default PostList
