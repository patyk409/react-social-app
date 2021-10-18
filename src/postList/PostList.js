import React, { useState, useEffect } from 'react'
import './PostList.css'
import axios from 'axios'

import Post from './Post'
import ConfirmationPopup from './ConfirmationPopup'
import CloserIcon from '../CloserIcon'
import Preloader from '../Preloader'

const PostList = (props) => {
  const [latestPosts, setLatestPosts] = useState([])
  // const [likeCounter, setLikeCounter] = useState([])

  useEffect(() => {
    // load more posts
    if (props.isVisible && latestPosts.length > 0) {
      getMorePosts(latestPosts[latestPosts.length - 1].created_at)
    }
  }, [props.isVisible])

  useEffect(() => {
    // latest posts
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/latest',
        JSON.stringify(),
        props.headerConfigAuth,
      )
      .then((res) => {
        setLatestPosts(res.data)
        // console.log('latest posts response: ', res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [props.postTrigger, props.likeTrigger, props.userToken, props.allFollowed])

  /*
   * get more posts
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

  // console.log(likeCounter)

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
                {/* {console.log(post.likes)} */}
                {props.userToken &&
                post.user.username !== localStorage.getItem('name') ? (
                  <div
                    className="unfollow-icon"
                    onClick={() => {
                      props.unfollowUser(post.user.id)
                    }}
                    tabIndex="0"
                  >
                    <i className="fas fa-minus post-author__unfollow-icon"></i>
                  </div>
                ) : null}
              </div>
              <Post
                userToken={props.userToken}
                // likes={post.likes}
                post={post}
                // postLike={props.postLike}
                // postDislike={props.postDislike}
                setMessageTrigger={props.setMessageTrigger}
                setMessage={props.setMessage}
                likeTrigger={props.likeTrigger}
                setLikeTrigger={props.setLikeTrigger}
                headerConfigAuth={props.headerConfigAuth}
                // likeCounter={likeCounter}
                // setLikeCounter={setLikeCounter}
              />
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
      <Preloader isVisible={props.isVisible} />
    </main>
  )
}

export default PostList
